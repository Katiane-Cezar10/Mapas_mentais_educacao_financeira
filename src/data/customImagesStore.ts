export interface CustomImagesConfig {
  comboHero?: string; // Foto principal de capa/combo no topo
  comboPrinted?: string; // Foto do combo impresso
  comboDigital?: string; // Foto do combo digital
  maps: Record<number, string>; // mapaId -> dataURL ou URL da imagem
}

const PRIMARY_KEY = 'mapas_do_dinheiro_custom_images_v1';
const BACKUP_KEY = 'mapas_do_dinheiro_custom_images_backup_v1';

// Garante que a foto customizada adicionada pelo usuário fique blindada e fixa
export const getStoredImages = (): CustomImagesConfig => {
  if (typeof window === 'undefined') {
    return { maps: {} };
  }

  // 1. Tenta recuperar do cache de runtime em memória
  const memoryCache = (window as unknown as { __NEUROMAP_CUSTOM_IMAGES__?: CustomImagesConfig }).__NEUROMAP_CUSTOM_IMAGES__;

  let loadedConfig: CustomImagesConfig = { maps: {} };

  // 2. Lê a chave primária
  try {
    const rawPrimary = localStorage.getItem(PRIMARY_KEY);
    if (rawPrimary) {
      const parsed = JSON.parse(rawPrimary);
      loadedConfig = {
        comboHero: parsed.comboHero || undefined,
        comboPrinted: parsed.comboPrinted || undefined,
        comboDigital: parsed.comboDigital || undefined,
        maps: parsed.maps || {},
      };
    }
  } catch (err) {
    console.error('Erro ao ler chave primária de imagens:', err);
  }

  // 3. Lê o backup permanente para garantir que nenhuma foto seja perdida
  try {
    const rawBackup = localStorage.getItem(BACKUP_KEY);
    if (rawBackup) {
      const parsedBackup = JSON.parse(rawBackup);
      // Mescla mapas mantendo qualquer foto já gravada
      loadedConfig.maps = {
        ...(parsedBackup.maps || {}),
        ...loadedConfig.maps,
      };
      if (!loadedConfig.comboHero && parsedBackup.comboHero) {
        loadedConfig.comboHero = parsedBackup.comboHero;
      }
      if (!loadedConfig.comboPrinted && parsedBackup.comboPrinted) {
        loadedConfig.comboPrinted = parsedBackup.comboPrinted;
      }
      if (!loadedConfig.comboDigital && parsedBackup.comboDigital) {
        loadedConfig.comboDigital = parsedBackup.comboDigital;
      }
    }
  } catch (err) {
    console.error('Erro ao ler backup de imagens:', err);
  }

  // 4. Se havia cache em memória com fotos, preserva
  if (memoryCache && memoryCache.maps) {
    loadedConfig.maps = {
      ...memoryCache.maps,
      ...loadedConfig.maps,
    };
  }

  // Atualiza cache em memória
  (window as unknown as { __NEUROMAP_CUSTOM_IMAGES__?: CustomImagesConfig }).__NEUROMAP_CUSTOM_IMAGES__ = loadedConfig;

  return loadedConfig;
};

export const saveStoredImages = (config: CustomImagesConfig): void => {
  if (typeof window === 'undefined') return;
  try {
    const serialized = JSON.stringify(config);
    // Salva na chave primária e na chave de backup redundante
    localStorage.setItem(PRIMARY_KEY, serialized);
    localStorage.setItem(BACKUP_KEY, serialized);

    // Salva no cache em memória
    (window as unknown as { __NEUROMAP_CUSTOM_IMAGES__?: CustomImagesConfig }).__NEUROMAP_CUSTOM_IMAGES__ = config;

    // Dispara evento para sincronizar componentes na página instantaneamente
    window.dispatchEvent(
      new CustomEvent('neuromap_images_updated', { detail: config })
    );
  } catch (err) {
    console.error('Erro ao salvar imagens personalizadas no armazenamento:', err);
  }
};

export const clearStoredImages = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(PRIMARY_KEY);
    localStorage.removeItem(BACKUP_KEY);
    delete (window as unknown as { __NEUROMAP_CUSTOM_IMAGES__?: CustomImagesConfig }).__NEUROMAP_CUSTOM_IMAGES__;
  } catch (err) {
    console.error('Erro ao limpar imagens personalizadas:', err);
  }
};
