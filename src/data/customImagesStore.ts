import {
  saveImagesToIndexedDB,
  loadImagesFromIndexedDB,
  clearIndexedDB,
} from './imageDatabase';

export interface CustomImagesConfig {
  comboHero?: string; // Foto principal de capa/combo no topo
  comboPrinted?: string; // Foto do combo impresso
  comboDigital?: string; // Foto do combo digital
  bundleShowcase?: string; // Foto do ecossistema multi-dispositivos (Tablet, Celular e Pranchas)
  pranchasShowcase?: string; // Foto da seção Navegue pelas pranchas oficiais por dentro
  maps: Record<number, string>; // mapaId -> dataURL ou URL da imagem
}

export const DEFAULT_OFFICIAL_MAPS: Record<number, string> = {
  2: '/maps/mapa-002-reserva-de-emergencia.png',
  3: '/maps/mapa-003-orcamento-pessoal.png',
  4: '/maps/mapa-004-dividas.png',
  5: '/maps/mapa-005-patrimonio.png',
};

const PRIMARY_KEY = 'mapas_do_dinheiro_custom_images_v1';

// Cache global em memória para sincronização instantânea inicializado com os assets originais anexados
let runtimeCache: CustomImagesConfig = {
  maps: { ...DEFAULT_OFFICIAL_MAPS },
};

export const getStoredImages = (): CustomImagesConfig => {
  if (typeof window === 'undefined') {
    return { maps: { ...DEFAULT_OFFICIAL_MAPS } };
  }

  // 1. Tenta ler do localStorage com proteção total contra falhas
  try {
    const raw = localStorage.getItem(PRIMARY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      runtimeCache = {
        comboHero: parsed.comboHero || undefined,
        comboPrinted: parsed.comboPrinted || undefined,
        comboDigital: parsed.comboDigital || undefined,
        bundleShowcase: parsed.bundleShowcase || undefined,
        pranchasShowcase: parsed.pranchasShowcase || undefined,
        maps: {
          ...DEFAULT_OFFICIAL_MAPS,
          ...(parsed.maps || {}),
        },
      };
      return runtimeCache;
    }
  } catch (err) {
    console.warn('Nota: lendo armazenamento local seguro...', err);
  }

  return runtimeCache;
};

/**
 * Inicialização assíncrona com IndexedDB e backend para suportar imagens em ultra-alta resolução
 * sem limites de tamanho ou cotas de 5MB do navegador.
 */
export const initStoredImages = async (
  onLoaded?: (config: CustomImagesConfig) => void
): Promise<CustomImagesConfig> => {
  if (typeof window === 'undefined') return { maps: { ...DEFAULT_OFFICIAL_MAPS } };

  // 1. Tenta carregar do backend local (/api/images)
  try {
    const res = await fetch('/api/images');
    if (res.ok) {
      const serverConfig = await res.json();
      if (serverConfig) {
        if (serverConfig.maps) {
          runtimeCache.maps = {
            ...DEFAULT_OFFICIAL_MAPS,
            ...runtimeCache.maps,
            ...serverConfig.maps,
          };
        }
        if (serverConfig.comboHero) runtimeCache.comboHero = serverConfig.comboHero;
        if (serverConfig.comboPrinted) runtimeCache.comboPrinted = serverConfig.comboPrinted;
        if (serverConfig.comboDigital) runtimeCache.comboDigital = serverConfig.comboDigital;
        if (serverConfig.bundleShowcase) runtimeCache.bundleShowcase = serverConfig.bundleShowcase;
        if (serverConfig.pranchasShowcase) runtimeCache.pranchasShowcase = serverConfig.pranchasShowcase;
      }
    }
  } catch (e) {
    // offline or backend fallback
  }

  // 2. Tenta carregar do IndexedDB de alta capacidade
  try {
    const dbConfig = await loadImagesFromIndexedDB<CustomImagesConfig>();
    if (dbConfig && (Object.keys(dbConfig.maps || {}).length > 0 || dbConfig.comboHero)) {
      runtimeCache = {
        comboHero: dbConfig.comboHero || runtimeCache.comboHero,
        comboPrinted: dbConfig.comboPrinted || runtimeCache.comboPrinted,
        comboDigital: dbConfig.comboDigital || runtimeCache.comboDigital,
        bundleShowcase: dbConfig.bundleShowcase || runtimeCache.bundleShowcase,
        pranchasShowcase: dbConfig.pranchasShowcase || runtimeCache.pranchasShowcase,
        maps: {
          ...DEFAULT_OFFICIAL_MAPS,
          ...(runtimeCache.maps || {}),
          ...(dbConfig.maps || {}),
        },
      };

      if (onLoaded) {
        onLoaded(runtimeCache);
      }

      window.dispatchEvent(
        new CustomEvent('neuromap_images_updated', { detail: runtimeCache })
      );

      return runtimeCache;
    }
  } catch (err) {
    console.warn('Erro ao carregar do IndexedDB:', err);
  }

  if (onLoaded) {
    onLoaded(runtimeCache);
  }

  return getStoredImages();
};

export const saveStoredImages = (config: CustomImagesConfig): void => {
  if (typeof window === 'undefined') return;

  const mergedConfig: CustomImagesConfig = {
    ...config,
    maps: {
      ...DEFAULT_OFFICIAL_MAPS,
      ...config.maps,
    },
  };

  // Atualiza cache em memória imediatamente
  runtimeCache = { ...mergedConfig };

  // 1. Salva no IndexedDB de alta capacidade (suporta gigabytes sem restrição)
  saveImagesToIndexedDB(mergedConfig).catch((err) => {
    console.warn('Aviso IndexedDB:', err);
  });

  // 2. Tenta sincronizar com o backend
  fetch('/api/images', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mergedConfig),
  }).catch(() => {});

  // 3. Salva no localStorage de forma segura, capturando QuotaExceededError se a foto for muito grande
  try {
    localStorage.setItem(PRIMARY_KEY, JSON.stringify(mergedConfig));
  } catch (err) {
    console.info('Armazenando imagens de alta resolução com segurança no IndexedDB.');
    try {
      const smallStub = {
        hasCustomImages: true,
        mapsCount: Object.keys(mergedConfig.maps).length,
      };
      localStorage.setItem('mapas_do_dinheiro_indexed_flag', JSON.stringify(smallStub));
    } catch {
      // Ignora silenciosamente
    }
  }

  // Notifica todos os componentes na aplicação
  window.dispatchEvent(
    new CustomEvent('neuromap_images_updated', { detail: mergedConfig })
  );
};

export const clearStoredImages = (): void => {
  if (typeof window === 'undefined') return;
  runtimeCache = { maps: { ...DEFAULT_OFFICIAL_MAPS } };
  try {
    localStorage.removeItem(PRIMARY_KEY);
    localStorage.removeItem('mapas_do_dinheiro_custom_images_backup_v1');
    localStorage.removeItem('mapas_do_dinheiro_indexed_flag');
  } catch (err) {
    console.warn('Erro ao limpar localStorage:', err);
  }
  clearIndexedDB().catch((err) => console.warn('Erro ao limpar IndexedDB:', err));

  window.dispatchEvent(
    new CustomEvent('neuromap_images_updated', { detail: { maps: { ...DEFAULT_OFFICIAL_MAPS } } })
  );
};
