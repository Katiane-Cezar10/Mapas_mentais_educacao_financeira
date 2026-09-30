import React from 'react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl border-2 border-slate-900 brutal-shadow-lg flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold font-display text-lg text-slate-900">
            {type === 'terms' ? 'Termos de Uso do Serviço' : 'Política de Privacidade & LGPD'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto text-sm text-slate-700 space-y-4 font-body leading-relaxed">
          {type === 'terms' ? (
            <>
              <p><strong>1. Natureza do Material Educacional:</strong> O produto &ldquo;Mapas do Dinheiro&rdquo; é um material exclusivamente didático e educacional em formato digital (PDF), destinado a facilitar a compreensão de conceitos de finanças pessoais e organização doméstica.</p>
              <p><strong>2. Aviso Legal de Investimentos:</strong> Nenhuma informação contida neste material constitui recomendação individual de investimento, consultoria financeira, oferta de valores mobiliários ou promessa de retorno financeiro. Decisões de investimento são de inteira responsabilidade do adquirente.</p>
              <p><strong>3. Direitos Autorais:</strong> Todos os mapas mentais, ilustrações, textos e compilações são protegidos pela Lei de Direitos Autorais (Lei nº 9.610/98). É terminantemente proibido rateio, revenda, cópia comercial ou distribuição não autorizada.</p>
              <p><strong>4. Garantia Incondicional de 7 Dias:</strong> Conforme o Artigo 49 do Código de Defesa do Consumidor brasileiro, você dispõe de 7 (sete) dias corridos a partir da confirmação do pagamento para solicitar reembolso integral sem qualquer burocracia.</p>
              <p><strong>5. Contato e Suporte:</strong> Para dúvidas ou atendimento, utilize nosso canal oficial em <span className="underline font-semibold">[suporte@mapasdodinheiro.com.br]</span>.</p>
            </>
          ) : (
            <>
              <p><strong>1. Coleta e Uso de Dados:</strong> Coletamos apenas as informações necessárias para efetuar a entrega digital do produto (nome e e-mail no ato do checkout) e processamento seguro do pagamento.</p>
              <p><strong>2. Conformidade com a LGPD (Lei nº 13.709/2018):</strong> Seus dados pessoais são armazenados de forma confidencial e jamais serão vendidos ou compartilhados com terceiros para fins de spam ou listas de transmissão.</p>
              <p><strong>3. Processamento de Pagamento Seguro:</strong> Os dados de pagamento (Pix, cartão de crédito) são criptografados de ponta a ponta e processados diretamente pela plataforma de pagamentos credenciada (PCI-DSS compliant). Não temos acesso ao número do seu cartão.</p>
              <p><strong>4. Exercício de Direitos:</strong> Você pode a qualquer momento solicitar a exclusão definitiva ou atualização dos seus dados cadastrais através do e-mail de suporte.</p>
            </>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800"
          >
            Entendido e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
