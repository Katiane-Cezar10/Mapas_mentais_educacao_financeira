export interface MindMapBranch {
  name: string;
  color: string; // Hex color
  icon: 'wallet' | 'cart' | 'piggy' | 'chart' | 'card' | 'shield' | 'target' | 'calendar' | 'percent' | 'alert' | 'zap' | 'check';
  leaves: string[];
  highlightWords?: string[];
}

export interface MindMapData {
  id: number;
  title: string;
  stage: 'Organizar' | 'Sair das dívidas' | 'Proteger' | 'Entender' | 'Investir' | 'Agir';
  stageColor: string;
  oneLineBenefit: string;
  centralSubtitle?: string;
  branches: MindMapBranch[];
  isUnlockedPreview: boolean;
  handwrittenNote?: string;
}

export const MAPS_DATA: MindMapData[] = [
  {
    id: 1,
    title: "Para onde vai seu dinheiro",
    stage: "Organizar",
    stageColor: "#2F6FDB",
    oneLineBenefit: "Tenha clareza total do seu fluxo mensal em menos de 2 minutos.",
    centralSubtitle: "Fluxo Mensal",
    isUnlockedPreview: true,
    handwrittenNote: "↑ O primeiro passo para nunca mais ficar no vermelho",
    branches: [
      {
        name: "Ganhar",
        color: "#0B8F63",
        icon: "wallet",
        leaves: ["Salário líquido", "Renda extra ativa / bicos", "Vendas ou reembolsos"],
        highlightWords: ["Salário líquido"]
      },
      {
        name: "Gastar",
        color: "#D9485F",
        icon: "cart",
        leaves: ["Custos fixos (moradia, luz)", "Custos variáveis (lazer, compras)", "Gastos do dia a dia"],
        highlightWords: ["Custos fixos"]
      },
      {
        name: "Guardar",
        color: "#0EA5A4",
        icon: "piggy",
        leaves: ["Reserva de emergência", "Metas de curto e médio prazo", "Transferência automática"],
        highlightWords: ["Reserva de emergência"]
      },
      {
        name: "Investir",
        color: "#8A5CD6",
        icon: "chart",
        leaves: ["Renda fixa segura", "Longo prazo e aposentadoria", "Juros trabalhando por você"],
        highlightWords: ["Longo prazo"]
      },
      {
        name: "Dívidas",
        color: "#E08A1E",
        icon: "alert",
        leaves: ["Fatura do cartão", "Empréstimos e financiamentos", "Cheque especial"],
        highlightWords: ["Cheque especial"]
      }
    ]
  },
  {
    id: 2,
    title: "Orçamento 50/30/20",
    stage: "Organizar",
    stageColor: "#2F6FDB",
    oneLineBenefit: "A regra de ouro dos milionários adaptada para a realidade brasileira.",
    centralSubtitle: "Regra Prática",
    isUnlockedPreview: true,
    handwrittenNote: "A fórmula que substitui qualquer planilha complicada",
    branches: [
      {
        name: "50% Necessidades",
        color: "#2F6FDB",
        icon: "shield",
        leaves: ["Aluguel ou prestação", "Contas de consumo (água, luz, internet)", "Supermercado e transporte essencial"],
        highlightWords: ["50%"]
      },
      {
        name: "30% Desejos",
        color: "#E08A1E",
        icon: "cart",
        leaves: ["Lazer de fim de semana", "Delivery e restaurantes", "Assinaturas de streaming e hobbies"],
        highlightWords: ["30%"]
      },
      {
        name: "20% Futuro",
        color: "#0B8F63",
        icon: "piggy",
        leaves: ["Reserva de segurança", "Quitação acelerada de dívidas", "Investimentos mensais"],
        highlightWords: ["20%"]
      },
      {
        name: "Exemplo Real",
        color: "#8A5CD6",
        icon: "wallet",
        leaves: ["Salário de R$ 3.000 na mão", "R$ 1.500 para necessidades (50%)", "R$ 900 para estilo de vida (30%)", "R$ 600 guardados no futuro (20%)"],
        highlightWords: ["R$ 3.000", "R$ 1.500", "R$ 900", "R$ 600"]
      }
    ]
  },
  {
    id: 3,
    title: "Gastos invisíveis",
    stage: "Organizar",
    stageColor: "#2F6FDB",
    oneLineBenefit: "Estanque os pequenos vazamentos que devoram até 25% do seu salário.",
    centralSubtitle: "Vazamentos",
    isUnlockedPreview: false,
    branches: [
      {
        name: "Assinaturas",
        color: "#D9485F",
        icon: "cart",
        leaves: ["Streaming esquecido que ninguém assiste", "Apps de teste com renovação automática", "Academia paga sem frequência"],
        highlightWords: ["renovação"]
      },
      {
        name: "Taxas Ocultas",
        color: "#E08A1E",
        icon: "alert",
        leaves: ["Tarifas bancárias de pacote tradicional", "Anuidade disfarçada no cartão", "Taxa de saque fora da rede"],
        highlightWords: ["Anuidade"]
      },
      {
        name: "Microgastos",
        color: "#E9B308",
        icon: "wallet",
        leaves: ["Cafézinho diário de R$ 9", "Taxas de entrega de delivery repetidas", "Corridas de aplicativo por preguiça"],
        highlightWords: ["R$ 9"]
      },
      {
        name: "Juros Silenciosos",
        color: "#8A5CD6",
        icon: "chart",
        leaves: ["Parcelado com juros embutidos no boleto", "Limite do cheque especial usado como renda", "Multas por esquecimento de vencimento"],
        highlightWords: ["juros embutidos"]
      },
      {
        name: "Ação Imediata",
        color: "#0B8F63",
        icon: "check",
        leaves: ["Revise os últimos 90 dias do extrato", "Cancele na hora o que não usou no mês", "Ative avisos de compra no celular"],
        highlightWords: ["90 dias"]
      }
    ]
  },
  {
    id: 4,
    title: "Cartão de crédito",
    stage: "Sair das dívidas",
    stageColor: "#D9485F",
    oneLineBenefit: "Transforme o maior vilão do brasileiro em um aliado com milhas e cashback.",
    centralSubtitle: "Uso Inteligente",
    isUnlockedPreview: false,
    branches: [
      {
        name: "Como Funciona",
        color: "#2F6FDB",
        icon: "card",
        leaves: ["Limite não é salário extra", "Melhor dia: logo após o fechamento", "Data de vencimento x fechamento"],
        highlightWords: ["fechamento"]
      },
      {
        name: "Armadilhas Mortais",
        color: "#D9485F",
        icon: "alert",
        leaves: ["Juros de 400%+ ao ano no rotativo", "Pagamento mínimo da fatura", "Parcelamento com juros abusivos"],
        highlightWords: ["400%+"]
      },
      {
        name: "Uso Estratégico",
        color: "#0B8F63",
        icon: "shield",
        leaves: ["Pagar 100% da fatura em dia", "Mantenha apenas 1 cartão principal", "Zero anuidade incondicional"],
        highlightWords: ["100%"]
      },
      {
        name: "Benefícios Reais",
        color: "#8A5CD6",
        icon: "target",
        leaves: ["Acúmulo de milhas em gastos normais", "Cashback direto na conta corrente", "Seguro proteção de preço gratuito"],
        highlightWords: ["Cashback"]
      }
    ]
  },
  {
    id: 5,
    title: "Saindo das dívidas",
    stage: "Sair das dívidas",
    stageColor: "#D9485F",
    oneLineBenefit: "O passo a passo estratégico para respirar aliviado e limpar seu nome.",
    centralSubtitle: "Plano de Saída",
    isUnlockedPreview: true,
    handwrittenNote: "Você não precisa de mágica, precisa de método",
    branches: [
      {
        name: "Liste Tudo",
        color: "#2F6FDB",
        icon: "calendar",
        leaves: ["Valor total de cada pendência", "Taxa mensal de juros de cada uma", "Valor real da parcela no mês"],
        highlightWords: ["Taxa mensal"]
      },
      {
        name: "Bola de Neve",
        color: "#0B8F63",
        icon: "target",
        leaves: ["Quite a menor dívida primeiro", "Gera vitória rápida e ânimo mental", "Repassa o valor para a próxima"],
        highlightWords: ["menor dívida"]
      },
      {
        name: "Método Avalanche",
        color: "#E08A1E",
        icon: "chart",
        leaves: ["Foque na dívida de maior juro primeiro", "Economiza o máximo de dinheiro em juros", "Ideal para perfil analítico e frio"],
        highlightWords: ["maior juro"]
      },
      {
        name: "Negociação",
        color: "#8A5CD6",
        icon: "wallet",
        leaves: ["Feirões de renegociação (Serasa/Desenrola)", "Descontos de até 90% para quitação à vista", "Portabilidade para juros menores"],
        highlightWords: ["até 90%"]
      },
      {
        name: "Regra de Ouro",
        color: "#D9485F",
        icon: "alert",
        leaves: ["Estanque rotativo e cheque especial", "Corte cartões até quitar as parcelas", "Nunca faça nova dívida para cobrir juros"],
        highlightWords: ["Regra de Ouro"]
      }
    ]
  },
  {
    id: 6,
    title: "Reserva de emergência",
    stage: "Proteger",
    stageColor: "#0EA5A4",
    oneLineBenefit: "O colchão que te dá sono tranquilo mesmo se você perder o emprego amanhã.",
    centralSubtitle: "Colchão Financeiro",
    isUnlockedPreview: false,
    branches: [
      {
        name: "Quanto Guardar",
        color: "#2F6FDB",
        icon: "shield",
        leaves: ["CLT estável = 6 meses de custo fixo", "Autônomo/PJ = 12 meses de custo de vida", "Baseie no custo de vida, não no salário"],
        highlightWords: ["6 meses", "12 meses"]
      },
      {
        name: "Onde Colocar",
        color: "#0B8F63",
        icon: "wallet",
        leaves: ["Tesouro Selic (o mais seguro do país)", "CDB liquidez diária (mínimo 100% CDI)", "Bancos sólidos com proteção do FGC"],
        highlightWords: ["100% CDI"]
      },
      {
        name: "Como Construir",
        color: "#E08A1E",
        icon: "piggy",
        leaves: ["Separe 10% da renda logo que cair o Pix", "Programe transferência automática", "Aportes com 13º e restituição de IR"],
        highlightWords: ["10%"]
      },
      {
        name: "Quando Usar",
        color: "#D9485F",
        icon: "alert",
        leaves: ["Desemprego inesperado ou queda brusca", "Saúde ou remédio urgente", "Conserto do carro ou encanamento", "NÃO usar para viagens ou promoções!"],
        highlightWords: ["NÃO usar"]
      }
    ]
  },
  {
    id: 7,
    title: "Metas financeiras",
    stage: "Proteger",
    stageColor: "#0EA5A4",
    oneLineBenefit: "A fórmula exata para transformar sonhos soltos em boletos pagos de conquista.",
    centralSubtitle: "Alvos Concretos",
    isUnlockedPreview: false,
    branches: [
      {
        name: "Curto Prazo",
        color: "#0B8F63",
        icon: "calendar",
        leaves: ["Prazo de até 1 ano", "Viagem de fim de ano, IPVA, matrículas", "Foco em liquidez imediata"],
        highlightWords: ["até 1 ano"]
      },
      {
        name: "Médio Prazo",
        color: "#2F6FDB",
        icon: "target",
        leaves: ["De 1 a 5 anos", "Troca do carro, entrada do imóvel", "CDBs prefixados e LCI/LCA"],
        highlightWords: ["1 a 5 anos"]
      },
      {
        name: "Longo Prazo",
        color: "#8A5CD6",
        icon: "chart",
        leaves: ["Mais de 5 anos até aposentadoria", "Liberdade financeira e patrimônio", "Tesouro IPCA+ e renda variável"],
        highlightWords: ["Mais de 5 anos"]
      },
      {
        name: "Método SMART",
        color: "#E08A1E",
        icon: "check",
        leaves: ["Específica e Mensurável em reais", "Alcançável com seu orçamento", "Relevante e com data limite no calendário"],
        highlightWords: ["SMART"]
      },
      {
        name: "Conta Simples",
        color: "#D9485F",
        icon: "wallet",
        leaves: ["Valor da meta ÷ Número de meses", "Ex: R$ 6.000 em 12 meses = R$ 500/mês", "Separe em conta separada do dia a dia"],
        highlightWords: ["R$ 500/mês"]
      }
    ]
  },
  {
    id: 8,
    title: "Juros compostos",
    stage: "Entender",
    stageColor: "#E08A1E",
    oneLineBenefit: "A oitava maravilha do mundo trabalhando no piloto automático para você.",
    centralSubtitle: "A Mágica do Tempo",
    isUnlockedPreview: false,
    branches: [
      {
        name: "Fórmula Básica",
        color: "#2F6FDB",
        icon: "chart",
        leaves: ["M = C × (1 + i)^t", "M = Montante final acumulado", "C = Capital inicial depositado", "t = Tempo em meses/anos"],
        highlightWords: ["M = C × (1 + i)^t"]
      },
      {
        name: "Juros Sobre Juros",
        color: "#0B8F63",
        icon: "zap",
        leaves: ["O rendimento passa a render também", "Efeito bola de neve exponencial", "Nos primeiros anos parece lento, depois dispara"],
        highlightWords: ["bola de neve"]
      },
      {
        name: "Tempo x Valor",
        color: "#8A5CD6",
        icon: "calendar",
        leaves: ["Começar com pouco hoje supera esperar", "10 anos a mais valem mais que dobrar o aporte", "A constância vence a quantia"],
        highlightWords: ["Começar cedo"]
      },
      {
        name: "Exemplo Real",
        color: "#0EA5A4",
        icon: "wallet",
        leaves: ["R$ 200/mês a 0,8% a.m. por 20 anos", "Você depositou do bolso: R$ 48 mil", "Saldo acumulado final: ≈ R$ 144 mil", "R$ 96 mil vieram puramente de juros!"],
        highlightWords: ["R$ 200/mês", "R$ 48 mil", "R$ 144 mil"]
      }
    ]
  },
  {
    id: 9,
    title: "Selic, CDI e inflação",
    stage: "Entender",
    stageColor: "#E08A1E",
    oneLineBenefit: "A sopa de letrinhas do noticiário traduzida de forma limpa e direta.",
    centralSubtitle: "Índices Essenciais",
    isUnlockedPreview: false,
    branches: [
      {
        name: "Taxa Selic",
        color: "#2F6FDB",
        icon: "chart",
        leaves: ["Taxa básica de juros do Brasil", "Decidida pelo Copom a cada 45 dias", "Referência de empréstimos e investimentos"],
        highlightWords: ["Copom 45 dias"]
      },
      {
        name: "Taxa CDI",
        color: "#0B8F63",
        icon: "wallet",
        leaves: ["Anda colada na Selic (Selic − 0,10%)", "Taxa de empréstimo entre bancos", "Régua oficial de rendimento da renda fixa"],
        highlightWords: ["Selic − 0,10%"]
      },
      {
        name: "Inflação (IPCA)",
        color: "#D9485F",
        icon: "alert",
        leaves: ["Mede a alta dos preços no mercado", "Corrói o poder de compra do seu salário", "Dinheiro na poupança perde para o IPCA"],
        highlightWords: ["IPCA"]
      },
      {
        name: "Juro Real",
        color: "#8A5CD6",
        icon: "target",
        leaves: ["Juro Real = Rendimento Bruto − Inflação", "O lucro que sobra de fato no seu bolso", "O único número que enriquece de verdade"],
        highlightWords: ["Juro Real"]
      }
    ]
  },
  {
    id: 10,
    title: "Tesouro Direto",
    stage: "Investir",
    stageColor: "#8A5CD6",
    oneLineBenefit: "Empreste dinheiro para o governo com garantia soberana a partir de R$ 30.",
    centralSubtitle: "Renda Fixa Pública",
    isUnlockedPreview: false,
    branches: [
      {
        name: "Tesouro Selic",
        color: "#0B8F63",
        icon: "shield",
        leaves: ["Perfeito para reserva de emergência", "Rendimento pós-fixado diário", "Não perde valor ao resgatar antes"],
        highlightWords: ["reserva de emergência"]
      },
      {
        name: "Tesouro Prefixado",
        color: "#2F6FDB",
        icon: "calendar",
        leaves: ["Taxa fixa travada no momento da compra", "Você sabe os centavos exatos no vencimento", "Cuidado: oscila se vender antes do prazo"],
        highlightWords: ["Taxa fixa"]
      },
      {
        name: "Tesouro IPCA+",
        color: "#8A5CD6",
        icon: "target",
        leaves: ["Protege 100% contra a inflação", "Paga IPCA + taxa fixa garantida", "Campeão para aposentadoria a longo prazo"],
        highlightWords: ["IPCA + taxa fixa"]
      },
      {
        name: "Custos e Impostos",
        color: "#E08A1E",
        icon: "alert",
        leaves: ["Tabela regressiva de IR (22,5% a 15%)", "15% de IR após 2 anos de aplicação", "Taxa de custódia da B3 de 0,20% ao ano"],
        highlightWords: ["15% após 2 anos"]
      }
    ]
  },
  {
    id: 11,
    title: "CDB, LCI e LCA",
    stage: "Investir",
    stageColor: "#8A5CD6",
    oneLineBenefit: "Renda fixa privada: quando vale a pena abrir mão da liquidez por lucro maior.",
    centralSubtitle: "Renda Fixa Privada",
    isUnlockedPreview: false,
    branches: [
      {
        name: "CDB",
        color: "#2F6FDB",
        icon: "wallet",
        leaves: ["Emitido por bancos para financiar crédito", "Tem cobrança de Imposto de Renda (tabela)", "Pode ter liquidez diária ou no vencimento"],
        highlightWords: ["Tem IR"]
      },
      {
        name: "LCI e LCA",
        color: "#0B8F63",
        icon: "shield",
        leaves: ["Ligadas ao Imobiliário e Agronegócio", "100% ISENTAS de Imposto de Renda para PF", "Exigem carência mínima antes de resgatar"],
        highlightWords: ["ISENTAS de IR"]
      },
      {
        name: "Garantia FGC",
        color: "#8A5CD6",
        icon: "target",
        leaves: ["Fundo Garantidor de Créditos", "Cobre até R$ 250 mil por CPF por instituição", "Teto global de R$ 1 milhão a cada 4 anos"],
        highlightWords: ["R$ 250 mil"]
      },
      {
        name: "Liquidez",
        color: "#E08A1E",
        icon: "calendar",
        leaves: ["Diária: resgate em qualquer dia útil", "No vencimento: dinheiro preso até a data", "Quanto menor a liquidez, maior o prêmio"],
        highlightWords: ["Liquidez diária"]
      }
    ]
  },
  {
    id: 12,
    title: "Seu plano de 90 dias",
    stage: "Agir",
    stageColor: "#0B8F63",
    oneLineBenefit: "O roteiro definitivo para transformar teoria financeira em paz de espírito na prática.",
    centralSubtitle: "Roteiro Prático",
    isUnlockedPreview: false,
    branches: [
      {
        name: "Mês 1 · Organizar",
        color: "#2F6FDB",
        icon: "calendar",
        leaves: ["Pente-fino nos últimos 90 dias de extrato", "Aplique a divisão 50/30/20 nas despesas", "Cancele os gastos invisíveis e assinaturas"],
        highlightWords: ["Mês 1", "50/30/20"]
      },
      {
        name: "Mês 2 · Limpar",
        color: "#E08A1E",
        icon: "shield",
        leaves: ["Mapeie todas as dívidas com taxa e saldo", "Elimine rotativo do cartão e cheque especial", "Adote o método Bola de Neve para vitórias"],
        highlightWords: ["Mês 2", "Bola de Neve"]
      },
      {
        name: "Mês 3 · Construir",
        color: "#0B8F63",
        icon: "piggy",
        leaves: ["Abra conta em corretora com taxa zero", "Primeiro aporte na Reserva (Tesouro Selic)", "Configure a transferência automática mensal"],
        highlightWords: ["Mês 3", "Tesouro Selic"]
      }
    ]
  }
];

export const STAGES_LEGEND = [
  { name: 'Organizar', maps: 'Mapas 1 a 3', color: '#2F6FDB', bg: 'bg-blue-100 text-blue-800 border-blue-300' },
  { name: 'Sair das dívidas', maps: 'Mapas 4 e 5', color: '#D9485F', bg: 'bg-rose-100 text-rose-800 border-rose-300' },
  { name: 'Proteger', maps: 'Mapas 6 e 7', color: '#0EA5A4', bg: 'bg-teal-100 text-teal-800 border-teal-300' },
  { name: 'Entender', maps: 'Mapas 8 e 9', color: '#E08A1E', bg: 'bg-amber-100 text-amber-800 border-amber-300' },
  { name: 'Investir', maps: 'Mapas 10 e 11', color: '#8A5CD6', bg: 'bg-purple-100 text-purple-800 border-purple-300' },
  { name: 'Agir', maps: 'Mapa 12', color: '#0B8F63', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
];

export interface ModuleCurriculum {
  moduleNum: string;
  title: string;
  count: string;
  items: { num: string; title: string }[];
}

export const MODULES_CURRICULUM: ModuleCurriculum[] = [
  {
    moduleNum: "01",
    title: "Organização do Dinheiro & Orçamento",
    count: "5 mapas mentais",
    items: [
      { num: "01", title: "Para onde vai seu dinheiro (Fluxo Mensal)" },
      { num: "02", title: "Orçamento 50/30/20 na prática brasileira" },
      { num: "03", title: "Gastos invisíveis e vazamentos silenciosos" },
      { num: "04", title: "Controle de despesas sem planilhas" },
      { num: "05", title: "Divisão de contas para casais e famílias" }
    ]
  },
  {
    moduleNum: "02",
    title: "Cartão de Crédito & Saída das Dívidas",
    count: "5 mapas mentais",
    items: [
      { num: "06", title: "Cartão de crédito: funcionamento e armadilhas" },
      { num: "07", title: "Saindo das dívidas: Bola de Neve vs Avalanche" },
      { num: "08", title: "Renegociação de dívidas e feirões limpa-nome" },
      { num: "09", title: "Eliminando o rotativo e o cheque especial" },
      { num: "10", title: "Uso estratégico de cashback e milhas" }
    ]
  },
  {
    moduleNum: "03",
    title: "Proteção & Reserva de Emergência",
    count: "5 mapas mentais",
    items: [
      { num: "11", title: "Reserva de emergência: quanto e onde guardar" },
      { num: "12", title: "Quando usar e quando NUNCA mexer na reserva" },
      { num: "13", title: "Seguros essenciais vs seguros inúteis" },
      { num: "14", title: "Proteção contra golpes no Pix e bancos" },
      { num: "15", title: "Fundo Garantidor de Créditos (FGC) descomplicado" }
    ]
  },
  {
    moduleNum: "04",
    title: "Metas Financeiras & Psicologia do Consumo",
    count: "5 mapas mentais",
    items: [
      { num: "16", title: "Metas financeiras SMART de curto, médio e longo prazo" },
      { num: "17", title: "Psicologia do dinheiro: freando o consumo por impulso" },
      { num: "18", title: "A regra das 72 horas para grandes compras" },
      { num: "19", title: "Como criar hábitos financeiros sustentáveis" },
      { num: "20", title: "Quadro de visualização e metas anuais" }
    ]
  },
  {
    moduleNum: "05",
    title: "Índices & Economia Descomplicada",
    count: "5 mapas mentais",
    items: [
      { num: "21", title: "Juros compostos: a mágica do tempo e aportes" },
      { num: "22", title: "Selic, CDI e IPCA (inflação) sem economês" },
      { num: "23", title: "Juro real: o que realmente faz seu patrimônio crescer" },
      { num: "24", title: "Como a taxa de juros afeta seu poder de compra" },
      { num: "25", title: "Tabela regressiva de Imposto de Renda" }
    ]
  },
  {
    moduleNum: "06",
    title: "Primeiros Passos na Renda Fixa & Ação",
    count: "5 mapas mentais",
    items: [
      { num: "26", title: "Tesouro Direto: Selic, Prefixado e IPCA+" },
      { num: "27", title: "CDB, LCI e LCA: isenção de IR e prazos" },
      { num: "28", title: "Como abrir conta em corretora e fazer o 1º aporte" },
      { num: "29", title: "Seu plano de 90 dias: do caos à tranquilidade" },
      { num: "30", title: "Rotina financeira mensal em 15 minutos" }
    ]
  }
];

export interface CustomerProof {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  highlight: string;
  message: string;
  tag: string;
  timeAgo: string;
  avatarBg: string;
  avatarInitials: string;
}

export const TESTIMONIALS_DATA: CustomerProof[] = [
  {
    id: "01",
    name: "Mariana Costa",
    role: "Professora do Ensino Básico",
    location: "São Paulo, SP",
    rating: 5,
    highlight: "No primeiro mês sobrou R$ 380",
    message: "Eu sempre tentava preencher aquelas planilhas de 20 abas e desistia na primeira semana. O Mapa 2 do 50/30/20 impresso na porta da geladeira me deu a visão que eu precisava. Pela primeira vez no ano sobrou dinheiro no fim do mês!",
    tag: "Orçamento 50/30/20",
    timeAgo: "há 3 dias",
    avatarBg: "bg-blue-600",
    avatarInitials: "MC"
  },
  {
    id: "02",
    name: "Rafael Meneses",
    role: "Motorista de Aplicativo",
    location: "Belo Horizonte, MG",
    rating: 5,
    highlight: "Saí do rotativo do cartão",
    message: "Estava há 7 meses pagando o mínimo da fatura e o juro comendo meu trabalho. O método Bola de Neve do Mapa 5 me deu a ordem exata de qual conta pagar primeiro. Já quitei duas dívidas!",
    tag: "Saindo das Dívidas",
    timeAgo: "há 5 dias",
    avatarBg: "bg-emerald-600",
    avatarInitials: "RM"
  },
  {
    id: "03",
    name: "Camila Duarte",
    role: "Enfermeira",
    location: "Campinas, SP",
    rating: 5,
    highlight: "Fiz meu primeiro investimento no Tesouro",
    message: "Morria de medo de investir porque achava que precisava ser rica ou entender de economia pesada. O Mapa 9 e o Mapa 10 me explicaram o que é CDI e Selic em 1 minuto. Coloquei R$ 100 no Tesouro Selic no mesmo dia.",
    tag: "Tesouro Direto",
    timeAgo: "há 1 semana",
    avatarBg: "bg-purple-600",
    avatarInitials: "CD"
  },
  {
    id: "04",
    name: "Lucas P. Andrade",
    role: "Vendedor Comercial",
    location: "Curitiba, PR",
    rating: 5,
    highlight: "O PDF no celular é surreal de prático",
    message: "Abro o mapa no celular antes de tomar qualquer decisão financeira. O design é impecável, as cores ajudam a memorizar e você não perde tempo com enrolação. Vale cada centavo dos 19 reais.",
    tag: "Praticidade no Celular",
    timeAgo: "há 1 semana",
    avatarBg: "bg-amber-600",
    avatarInitials: "LA"
  },
  {
    id: "05",
    name: "Juliana Silveira",
    role: "Designer Gráfica Autônoma",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    highlight: "O bônus do ChatGPT foi um divisor de águas",
    message: "Peguei o pacote completo com o ChatGPT e foi a melhor escolha. Hoje jogo o extrato do banco nele usando o prompt do material e ele já categoriza tudo no 50/30/20 em 10 segundos. Sensacional!",
    tag: "Pacote Completo + ChatGPT",
    timeAgo: "há 2 semanas",
    avatarBg: "bg-rose-600",
    avatarInitials: "JS"
  },
  {
    id: "06",
    name: "André F. Toledo",
    role: "Técnico de TI",
    location: "Porto Alegre, RS",
    rating: 5,
    highlight: "Direto ao ponto, zero enrolação",
    message: "Odeio vídeo de 40 minutos com guru querendo vender mentoria de 5 mil. Os mapas mentais entregam o ouro mastigado. Recomendo para qualquer pessoa que quer organizar a vida financeira sem estresse.",
    tag: "Anti-Enrolação",
    timeAgo: "há 2 semanas",
    avatarBg: "bg-teal-600",
    avatarInitials: "AT"
  }
];

