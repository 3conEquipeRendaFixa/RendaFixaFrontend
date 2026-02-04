/**
 * Configuração de campos dinâmicos por tipo de ativo
 * Baseado no design do Figma - Cadastro de Ativos
 */

export interface DetailField {
  key: string;
  label: string;
  editable?: boolean;
}

export interface DetailSection {
  id: string;
  title: string;
  fields: DetailField[];
}

export interface AssetTypeConfig {
  sections: DetailSection[];
}

/**
 * Campos comuns da seção "Ativo" para Debêntures (DEB)
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const DEB_ATIVO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'codigo', label: 'Código do Ativo' },
  { key: 'esforcoRestrito', label: 'Esforço Restrito' },
  { key: 'dataEmissao', label: 'Data de Emissão' },
  { key: 'debentureSecuritizacao', label: 'Debênture de securitização' },
  // Linha 2
  { key: 'apelido', label: 'Apelido', editable: true },
  { key: 'debentureIncentivada', label: 'Debênture Incentivada' },
  { key: 'dataVencimento', label: 'Data de Vencimento' },
  { key: 'eventosCursadosB3', label: 'Eventos Cursados na B3?' },
  // Linha 3
  { key: 'emissor', label: 'Emissor (Razão Social)' },
  { key: 'regraIncentivo', label: 'Regra do Incentivo' },
  { key: 'classe', label: 'Classe' },
  { key: 'ritoOferta', label: 'Rito de Oferta' },
  // Linha 4
  { key: 'emissorCnpj', label: 'Emissor (CNPJ)' },
  { key: 'statusDebenture', label: 'Status da Debênture' },
  { key: 'instrumentoVencidoInadimplido', label: 'Instrumento Vencido e Inadimplido' },
  { key: 'pendenteDemonstracao', label: 'Pendente de Demonstração Financeiro' },
  // Linha 5
  { key: 'emissao', label: 'Emissão' },
  { key: 'dataUltimaAlteracao', label: 'Data Última Alteração' },
  { key: 'agenteFiduciario', label: 'Agente Fiduciário' },
  { key: 'possibilidadeResgateAntecipado', label: 'Possibilidade de Resgate Antecipado?' },
  // Linha 6
  { key: 'tipoEmissao', label: 'Tipo de Emissão' },
  { key: 'escrituradorNomeSimples', label: 'Escriturador/Emissor (Nome Simples)' },
  { key: 'serie', label: 'Série' },
  { key: 'codigoISIN', label: 'ISIN' },
  // Linha 7
  { key: 'forma', label: 'Forma' },
  { key: 'garantiaEspecie', label: 'Garantia/Espécie' },
  { key: 'tipoRegime', label: 'Tipo de Regime' },
  { key: 'admiteSubscricaoSemIntegralizacao', label: 'Admite Subscrição sem a Integralização?' },
];

/**
 * Campos da seção "Quantidade" para Debêntures
 */
const DEB_QUANTIDADE_FIELDS: DetailField[] = [
  { key: 'quantidadeEmitida', label: 'Quantidade Emitida' },
  { key: 'quantidadeResgatada', label: 'Quantidade Resgatada' },
  { key: 'quantidadeCirculacao', label: 'Quantidade em Circulação' },
  { key: 'quantidadeConvertida', label: 'Quantidade Convertida' },
];

/**
 * Campos da seção "Valores" para Debêntures
 */
const DEB_VALORES_FIELDS: DetailField[] = [
  { key: 'valorNominalEmissao', label: 'Valor Nominal na Emissão' },
  { key: 'valorNominalAtualizado', label: 'Valor Nominal Atualizado' },
  { key: 'precoUnitario', label: 'Preço Unitário' },
  { key: 'valorFinanceiro', label: 'Valor Financeiro' },
];

/**
 * Campos da seção "Remuneração" para Debêntures
 */
const DEB_REMUNERACAO_FIELDS: DetailField[] = [
  { key: 'tipoRemuneracao', label: 'Tipo de Remuneração' },
  { key: 'indexador', label: 'Indexador' },
  { key: 'percentualIndexador', label: 'Percentual do Indexador' },
  { key: 'spreadRemuneracao', label: 'Spread da Remuneração' },
  { key: 'dataPagamentoRemuneracao', label: 'Data de Pagamento' },
  { key: 'periodicidadePagamento', label: 'Periodicidade de Pagamento' },
  { key: 'baseCalculoDias', label: 'Base de Cálculo (Dias)' },
  { key: 'criterioCalculoRemuneracao', label: 'Critério de Cálculo' },
  { key: 'tipoTaxaRemuneracao', label: 'Tipo de Taxa' },
];

/**
 * Campos da seção "Juros/Spread" para Debêntures
 */
const DEB_JUROS_SPREAD_FIELDS: DetailField[] = [
  { key: 'taxaJuros', label: 'Taxa de Juros' },
  { key: 'spreadJuros', label: 'Spread' },
  { key: 'periodicidadeJuros', label: 'Periodicidade' },
  { key: 'dataInicioJuros', label: 'Data de Início' },
  { key: 'dataPagamentoJuros', label: 'Data de Pagamento' },
  { key: 'baseCalculoJuros', label: 'Base de Cálculo' },
  { key: 'criterioCalculoJuros', label: 'Critério de Cálculo' },
  { key: 'tipoTaxaJuros', label: 'Tipo de Taxa' },
];

/**
 * Campos da seção "Amortização" para Debêntures
 */
const DEB_AMORTIZACAO_FIELDS: DetailField[] = [
  { key: 'tipoAmortizacao', label: 'Tipo de Amortização' },
  { key: 'dataInicioAmortizacao', label: 'Data de Início' },
  { key: 'periodicidadeAmortizacao', label: 'Periodicidade' },
  { key: 'percentualAmortizacao', label: 'Percentual' },
];

/**
 * Campos da seção "Distribuição" para Debêntures
 */
const DEB_DISTRIBUICAO_FIELDS: DetailField[] = [
  { key: 'tipoDistribuicao', label: 'Tipo de Distribuição' },
  { key: 'dataInicioDistribuicao', label: 'Data de Início' },
];

/**
 * Campos da seção "Dados do Título Sustentável"
 */
const DEB_TITULO_SUSTENTAVEL_FIELDS: DetailField[] = [
  { key: 'tituloSustentavel', label: 'É Título Sustentável?' },
];

/**
 * Campos da seção "Negociação de Valores Mobiliários"
 */
const DEB_NEGOCIACAO_FIELDS: DetailField[] = [
  { key: 'negociacaoSecundaria', label: 'Negociação Secundária' },
  { key: 'mercadoNegociacao', label: 'Mercado de Negociação' },
  { key: 'segmentoNegociacao', label: 'Segmento' },
];

/**
 * Campos comuns para CRI/CRA
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const CRI_CRA_ATIVO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'codigoIF', label: 'Código IF' },
  { key: 'nomeSimplificadoAgentePagamento', label: 'Nome Simplificado do Agente de Pagamento' },
  { key: 'coobrigacao', label: 'Coobrigação' },
  { key: 'ritoOferta', label: 'Rito de Oferta' },
  // Linha 2
  { key: 'apelido', label: 'Apelido', editable: true },
  { key: 'dataEmissao', label: 'Data de Emissão' },
  { key: 'possibilidadeResgateAntecipado', label: 'Possibilidade de Resgate Antecipado' },
  { key: 'situacao', label: 'Situação' },
  // Linha 3
  { key: 'contaEmissorRegistrador', label: 'Conta Emissor/Registrador' },
  { key: 'dataVencimento', label: 'Data de Vencimento' },
  { key: 'instrumentoVencidoInadimplido', label: 'Instrumento Vencido e Inadimplido' },
  { key: 'nomeSimplificadoEmissorRegistrador', label: 'Nome Simplificado Emissor/Registrador' },
  // Linha 4
  { key: 'dataInicioRentabilidade', label: 'Data Início de Rentabilidade' },
  { key: 'tipoRegime', label: 'Tipo de Regime' },
  { key: 'ifInadimplente', label: 'IF Inadimplente' },
  { key: 'contaEscriturador', label: 'Conta Escriturador' },
  // Linha 5
  { key: 'codigoISIN', label: 'Código ISIN' },
  { key: 'eventosCursadosB3', label: 'Eventos Cursados na B3?' },
  { key: 'dataRegistro', label: 'Data de Registro' },
  { key: 'nomeSimplificadoEscriturador', label: 'Nome Simplificado Escriturador' },
  // Linha 6
  { key: 'regimeFiduciario', label: 'Regime Fiduciário' },
  { key: 'publicoOferta', label: 'Público da Oferta' },
  { key: 'dataAlteracao', label: 'Data de Alteração' },
  { key: 'contaAgentePagamento', label: 'Conta do Agente de Pagamento' },
];

/**
 * Campos da seção "Dados da Emissão e Registro" para CRI/CRA
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const CRI_CRA_EMISSAO_REGISTRO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'emissao', label: 'Emissão' },
  { key: 'quantidadeDepositada', label: 'Quantidade Depositada' },
  { key: 'valorOriginal', label: 'Valor de (Original)' },
  { key: 'serie', label: 'Série' },
  // Linha 2
  { key: 'valorFinanceiroEmissao', label: 'Valor Financeiro da Emissão (R$)' },
  { key: 'dataEm', label: 'Data (em)' },
  { key: 'tipoSerie', label: 'Tipo da Série' },
  { key: 'quantidadeEmitida', label: 'Quantidade Emitida' },
  // Linha 3
  { key: 'quantidadeResgatada', label: 'Quantidade Resgatada' },
  { key: 'esforcoRestrito', label: 'Esforço Restrito' },
  { key: 'distribuicaoEncerraEm', label: 'Distribuição encerra em' },
  { key: 'valorUnitarioEmissao', label: 'Valor Unitário da Emissão' },
];

/**
 * Campos da seção "Formas de Pagamento" para CRI/CRA
 */
const CRI_CRA_FORMAS_PAGAMENTO_FIELDS: DetailField[] = [
  { key: 'formaPagamento', label: 'Forma de Pagamento' },
  { key: 'indice', label: 'Índice' },
  { key: 'percentualTaxaFlutuante', label: '% da Taxa Flutuante' },
  { key: 'taxa', label: 'Taxa' },
];

/**
 * Campos da seção "Formas de Pagamento e Juros Amortizados" para CRI/CRA
 */
const CRI_CRA_JUROS_AMORTIZADOS_FIELDS: DetailField[] = [
  { key: 'tipoAmortizacao', label: 'Tipo de Amortização' },
  { key: 'valorUnitarioEmissaoAtualizado', label: 'Valor Unitário de Emissão Atualizado' },
  { key: 'precoUnitarioAtualizado', label: 'Preço Unitário Atualizado' },
  { key: 'valorBaseCalculo', label: 'Valor de (Base de Cálculo)' },
];

/**
 * Campos da seção "Complemento para Anexo II do ICVM 414/04" para CRI/CRA
 */
const CRI_CRA_COMPLEMENTO_ICVM_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'codigoCVM', label: 'Código CVM' },
  { key: 'taxaAmortizacao', label: 'Taxa de amortização' },
  { key: 'tipoGarantia', label: 'Tipo de Garantia' },
  { key: 'nomeGarantidor', label: 'Nome do Garantidor' },
  // Linha 2
  { key: 'periodicidadePagamentos', label: 'Periodicidade de pagamentos' },
  { key: 'periodicidadeAmortizacao', label: 'Periodicidade de amortização' },
  { key: 'naturezaGarantidor', label: 'Natureza (Garantidor)' },
];

/**
 * Campos da seção "Autorização de Registro" para CRI/CRA
 */
const CRI_CRA_AUTORIZACAO_REGISTRO_FIELDS: DetailField[] = [
  { key: 'numRegistroCVM', label: 'Núm. Registro na CVM' },
  { key: 'dataRegistroProvisorio', label: 'Data do Registro Provisório' },
  { key: 'dataRegistroDefinitivo', label: 'Data do Registro Definitivo' },
];

/**
 * Campos da seção "Banco Liquidante" para CRI/CRA
 */
const CRI_CRA_BANCO_LIQUIDANTE_FIELDS: DetailField[] = [
  { key: 'codigoBancoLiquidante', label: 'Código do Banco Liquidante' },
  { key: 'contaCorrenteBancoLiquidante', label: 'Conta Corrente no Banco Liquidante' },
  { key: 'agenciaBancoLiquidante', label: 'Agência no Banco Liquidante' },
];

/**
 * Campos da seção "Agente Fiduciário" para CRI/CRA
 */
const CRI_CRA_AGENTE_FIDUCIARIO_FIELDS: DetailField[] = [
  { key: 'agenteFiduciario', label: 'Agente Fiduciário' },
  { key: 'razaoSocialNome', label: 'Razão Social ou Nome' },
  { key: 'cpfCnpjAgenteFiduciario', label: 'CPF/CNPJ' },
];

/**
 * Campos da seção "Securitização" para CRI/CRA
 */
const CRI_CRA_SECURITIZACAO_FIELDS: DetailField[] = [
  { key: 'garantiaFlutuante', label: 'Garantia Flutuante' },
  { key: 'lastroDevedor', label: 'Lastro (Devedor)' },
  { key: 'termoSecuritizacaoFormalizado', label: 'Termo Securitização Formalizado' },
  { key: 'tipoLastro', label: 'Tipo de Lastro' },
];

/**
 * Campos da seção "Classificação de Risco" para CRI/CRA
 */
const CRI_CRA_CLASSIFICACAO_RISCO_FIELDS: DetailField[] = [
  { key: 'classificadoraRisco1', label: 'Classificadora de Risco 1' },
  { key: 'rating1', label: 'Rating 1' },
  { key: 'classificadoraRisco2', label: 'Classificadora de Risco 2' },
  { key: 'rating2', label: 'Rating 2' },
];

/**
 * Campos da seção "Dados do Título Sustentável" para CRI/CRA
 */
const CRI_CRA_TITULO_SUSTENTAVEL_FIELDS: DetailField[] = [
  { key: 'tituloSustentavel', label: 'Título Sustentável' },
];

/**
 * Campos comuns para CDB
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const CDB_ATIVO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'tipo', label: 'Tipo' },
  { key: 'situacao', label: 'Situação' },
  { key: 'contaEmissor', label: 'Conta do Emissor' },
  { key: 'dataVencimento', label: 'Data Vencimento' },
  // Linha 2
  { key: 'codigoIF', label: 'Código IF' },
  { key: 'ifInadimplente', label: 'IF Inadimplente' },
  { key: 'nomeSimplificadoEmissor', label: 'Nome Simplificado Emissor' },
  { key: 'prazoEmissao', label: 'Prazo emissão' },
  // Linha 3
  { key: 'apelido', label: 'Apelido', editable: true },
  { key: 'dataRegistro', label: 'Data de Registro' },
  { key: 'dataEmissao', label: 'Data Emissão' },
  { key: 'tipoRegime', label: 'Tipo Regime' },
  // Linha 4
  { key: 'codigoISIN', label: 'Código ISIN' },
  { key: 'dataAlteracao', label: 'Data de Alteração' },
];

/**
 * Campos comuns para LF (Letra Financeira)
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const LF_ATIVO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'codigoIF', label: 'Código IF' },
  { key: 'contaEmissor', label: 'Conta do Emissor' },
  { key: 'dataEmissao', label: 'Data de Emissão' },
  { key: 'ifInadimplente', label: 'IF Inadimplente' },
  // Linha 2
  { key: 'apelido', label: 'Apelido', editable: true },
  { key: 'nomeSimplificadoEmissor', label: 'Nome Simplificado do Emissor' },
  { key: 'dataVencimento', label: 'Data de Vencimento' },
  { key: 'dataRegistro', label: 'Data de Registro' },
  // Linha 3
  { key: 'codigoISIN', label: 'Código ISIN' },
  { key: 'razaoSocialEmissor', label: 'Razão Social do Emissor' },
  { key: 'prazoEmissao', label: 'Prazo de Emissão' },
  { key: 'dataAlteracao', label: 'Data de Alteração' },
  // Linha 4
  { key: 'situacao', label: 'Situação' },
];

/**
 * Campos da seção "Dados da Emissão e Registro" para LF
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const LF_EMISSAO_REGISTRO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'quantidadeEmitida', label: 'Quantidade Emitida' },
  { key: 'valorFinanceiroEmissao', label: 'Valor Financeiro de Emissão' },
  { key: 'modeloDistribuicao', label: 'Modelo da Distribuição' },
  { key: 'esforcoRestrito', label: 'Esforço Restrito' },
  // Linha 2
  { key: 'quantidadeDepositada', label: 'Quantidade Depositada' },
  { key: 'valorOriginal', label: 'Valor de (Original)' },
  { key: 'dataInicioDistribuicao', label: 'Data de Início de Distribuição' },
  { key: 'tipoRegime', label: 'Tipo de Regime' },
  // Linha 3
  { key: 'quantidadeResgatada', label: 'Quantidade Resgatada' },
  { key: 'descricaoAdicional', label: 'Descrição Adicional' },
  { key: 'dataFimDistribuicao', label: 'Data Fim de Distribuição' },
  { key: 'eventosCursadosB3', label: 'Eventos Cursados pela B3?' },
  // Linha 4
  { key: 'valorUnitarioEmissao', label: 'Valor Unitário de Emissão' },
  { key: 'distribuicaoPublica', label: 'Distribuição Pública' },
  { key: 'coordenadorLider', label: 'Coodernador Líder' },
  { key: 'contaEscriturador', label: 'Conta Escriturador/Emissor' },
];

/**
 * Campos da seção "Valores Atualizados" para LF
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const LF_VALORES_ATUALIZADOS_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'valorBaseCalculo', label: 'Valor de (Base de Cálculo)' },
  { key: 'precoUnitarioAtualizado', label: 'Preço Unitário Atualizado' },
  { key: 'dataEmissaoUnitario', label: 'Data Emissão Unitário' },
  { key: 'dataPrecoUnitario', label: 'Data Preço Unitário' },
  // Linha 2
  { key: 'valorUnitarioEmissaoAtualizado', label: 'Valor Unitário de Emissão Atualizado' },
  { key: 'valorFinanceiroAtualizado', label: 'Valor Financeiro Atualizado' },
  { key: 'dataUnitarioJuros', label: 'Data Unitário Juros' },
  { key: 'dataFinanceiro', label: 'Data Financeiro' },
  // Linha 3
  { key: 'precoUnitarioJuros', label: 'Preço Unitário de Juros' },
  { key: 'dataValorBaseCalculo', label: 'Data Valor (Base de Cálculo)' },
];

/**
 * Campos da seção "Classificadora(s) de Risco" para LF
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const LF_CLASSIFICADORA_RISCO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'classificadoraRisco1', label: 'Classificadora de Risco 1' },
  { key: 'rating1', label: 'Rating 1' },
  { key: 'classificadoraRisco2', label: 'Classificadora de Risco 2' },
  { key: 'rating2', label: 'Rating 2' },
];

/**
 * Campos da seção "Autorização de Registro CVM" para LF
 */
const LF_AUTORIZACAO_CVM_FIELDS: DetailField[] = [
  { key: 'autorizacaoRegistroCVM', label: 'Autorização de Registro CVM' },
];

/**
 * Campos da seção "Forma de Pagamento" para LF
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const LF_FORMA_PAGAMENTO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'formaPagamento', label: 'Formas de Pagamento' },
  { key: 'percentualTaxaFlutuante', label: '% da Taxa Flutuante' },
  { key: 'criterioCalculoJuros', label: 'Critério de cálculo de juros' },
  { key: 'dataEm', label: 'Data (em)' },
  // Linha 2
  { key: 'rentabilidadeIndexador', label: 'Rentabilidade/Indexador/Taxa Flutuante' },
  { key: 'taxaJurosSpread', label: 'Taxa de Juros/Spread' },
  { key: 'incorporaJuros', label: 'Incorpora Juros' },
  { key: 'valorAposIncorporacaoJuros', label: 'Valor Após Incorporação de Juros' },
];

/**
 * Campos comuns para LCI/LCA
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const LCI_LCA_ATIVO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'tipo', label: 'Tipo' },
  { key: 'situacao', label: 'Situação' },
  { key: 'valorNominalUnitario', label: 'Valor Nominal unitário' },
  { key: 'manutUnilateralGarantias', label: 'Manut. Unilateral das Garantias pelo Emissor' },
  // Linha 2
  { key: 'apelido', label: 'Apelido', editable: true },
  { key: 'dataRegistro', label: 'Data de Registro' },
  { key: 'indice', label: 'Índice' },
  { key: 'condicaoResgateAntecipado', label: 'Condição de Resgate Antecipado' },
  // Linha 3
  { key: 'codigoIF', label: 'Código IF' },
  { key: 'dataEmissao', label: 'Data de Emissão' },
  { key: 'cestaGarantias', label: 'Cesta de Garantias' },
  { key: 'clausulaResgateEmissor', label: 'Cláusula de Resgate pelo Emissor' },
  // Linha 4
  { key: 'codigoISIN', label: 'Código ISIN' },
  { key: 'tipoRegime', label: 'Tipo de Regime' },
  { key: 'obsCesta', label: 'Obs. Cesta' },
  { key: 'lote', label: 'Lote' },
  // Linha 5
  { key: 'nomeSimplificadoRegistradorEmissor', label: 'Nome Simplificado do Registrador/ Emissor' },
  { key: 'dataVencimento', label: 'Data de Vencimento' },
  { key: 'dataUltAlteracao', label: 'Data Últ. Alteração' },
  { key: 'veiculoGarantidor', label: 'Veículo Garantidor' },
  // Linha 6
  { key: 'registradorEmissor', label: 'Registrador/ Emissor' },
  { key: 'tipoGarantia', label: 'Tipo de Garantia' },
  { key: 'liquidacaoAntecipada', label: 'Liquidação Antecipada' },
];

/**
 * Campos da seção "Dados da Emissão e Registro" para LCI/LCA
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const LCI_LCA_EMISSAO_REGISTRO_FIELDS: DetailField[] = [
  { key: 'quantidadeEmitida', label: 'Quantidade Emitida' },
  { key: 'quantidadeDepositada', label: 'Quantidade Depositada' },
  { key: 'quantidadeResgatada', label: 'Quantidade Resgatada' },
];

/**
 * Campos da seção "Título Registrado com Prazo Decorrido" para LCI/LCA
 */
const LCI_LCA_TITULO_PRAZO_DECORRIDO_FIELDS: DetailField[] = [
  { key: 'valorUnitario', label: 'Valor de (Unitário)' },
  { key: 'dataPrazoDecorrido', label: 'Data' },
];

/**
 * Campos da seção "Forma de Pagamento" para LCI/LCA
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const LCI_LCA_FORMA_PAGAMENTO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'formaPagamento', label: 'Forma de Pagamento' },
  { key: 'incorporaJuros', label: 'Incorpora Juros' },
  { key: 'precoUnitarioJuros', label: 'Preço Unitário de Juros' },
  { key: 'percentualIndiceTaxaFlutuante', label: '% Índice/ Taxa Flutuante' },
  // Linha 2
  { key: 'dataFormaPagamento', label: 'Data' },
  { key: 'precoUnitarioAtualizado', label: 'Preço Unitário Atualizado' },
  { key: 'taxaJurosSpread', label: 'Taxa de Juros/ Spread' },
  { key: 'valorAposIncorporacaoJuros', label: 'Valor após Incorporação de Juros' },
  // Linha 3
  { key: 'valorFinanceiroAtualizado', label: 'Valor Financeiro Atualizado' },
  { key: 'criterioCalculoJuros', label: 'Critério de Calculo de Juros' },
  { key: 'valorUnitarioEmissaoAtualizado', label: 'Valor Unitário de Emissão Atualizado' },
];

/**
 * Campos da seção "Dados do Título Sustentável" para LCI/LCA
 */
const LCI_LCA_TITULO_SUSTENTAVEL_FIELDS: DetailField[] = [
  { key: 'tituloSustentavel', label: 'Título Sustentável' },
  { key: 'certificadoPor', label: 'Certificado por' },
  { key: 'dataVerificacao', label: 'Data de Verificação' },
];

/**
 * Campos da seção "Dados da Emissão e Registro" para CDB
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const CDB_EMISSAO_REGISTRO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'quantidadeEmitida', label: 'Quantidade Emitida' },
  { key: 'valorUnitarioEmissao', label: 'Valor Unitário de Emissão' },
  { key: 'valorFinanceiroResgate', label: 'Valor Financeiro de Resgate' },
  { key: 'condicaoResgateAntecipado', label: 'Condição de Resgate Antecipado' },
  // Linha 2
  { key: 'quantidadeDepositada', label: 'Quantidade Depositada' },
  { key: 'valorFinanceiroEmissao', label: 'Valor Financeiro de Emissão' },
  { key: 'valorOriginal', label: 'Valor de (Original)' },
  { key: 'descricaoAdicional', label: 'Descrição Adicional' },
  // Linha 3
  { key: 'quantidadeResgatada', label: 'Quantidade Resgatada' },
  { key: 'valorUnitarioResgate', label: 'Valor Unitário do Resgate' },
  { key: 'dataEmissaoRegistro', label: 'Data' },
  { key: 'controleInterno', label: 'Controle Interno' },
];

/**
 * Campos da seção "Valores Atualizados" para CDB
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const CDB_VALORES_ATUALIZADOS_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'valorBaseCalculo', label: 'Valor de (Base de Cálculo)' },
  { key: 'dataEmissaoUnitario', label: 'Data Emissão Unitário' },
  { key: 'precoUnitarioAtualizado', label: 'Preço Unitário Atualizado' },
  { key: 'valorFinanceiroAtualizado', label: 'Valor Financeiro Atualizado' },
  // Linha 2
  { key: 'dataValor', label: 'Data Valor' },
  { key: 'precoUnitarioJuros', label: 'Preço Unitário de Juros' },
  { key: 'dataUnitario', label: 'Data Unitário' },
  { key: 'dataFinanceiro', label: 'Data Financeiro' },
  // Linha 3
  { key: 'valorUnitarioEmissaoAtualizado', label: 'Valor Unitário de Emissão Atualizado' },
  { key: 'dataUnitarioJuros', label: 'Data Unitário de Juros' },
];

/**
 * Campos da seção "Forma de Pagamento" para CDB
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const CDB_FORMA_PAGAMENTO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'formaPagamento', label: 'Forma de Pagamento' },
  { key: 'proRataCorrecaoIndicesPreco', label: 'Pró-Rata da Correção - Índices de Preço' },
  { key: 'escalonamentoTipoCorrecaoCurva2', label: 'Escalonamento - Tipo de Correção (Curva2)' },
  { key: 'escalonamentoProRataCorrecaoCurva3', label: 'Escalonamento - Pró-Rata da Correção (Curva3)' },
  // Linha 2
  { key: 'rentabilidadeIndexador', label: 'Rentabilidade/ Indexador/ Taxa Flutuante' },
  { key: 'escalonamento', label: 'Escalonamento' },
  { key: 'escalonamentoPercentualTaxaFlutCurva2', label: 'Escalonamento - % da Taxa Flutuante (Curva2)' },
  { key: 'escalonamentoTipoCorrecaoCurva3', label: 'Escalonamento - Tipo de Correção (Curva3)' },
  // Linha 3
  { key: 'percentualIndiceTaxaFlutuante', label: '% Índice/ Taxa Flutuante' },
  { key: 'escalonamentoMultiplasCurvas', label: 'Escalonamento - Múltiplas Curvas' },
  { key: 'escalonamentoTaxaJurosSpreadCurva2', label: 'Escalonamento - Taxa de Juros/Spread (Curva2)' },
  { key: 'escalonamentoPercentualTaxaFlutCurva3', label: 'Escalonamento - % da Taxa Flutuante (Curva3)' },
  // Linha 4
  { key: 'taxaJurosSpread', label: 'Taxa de Juros/ Spread' },
  { key: 'escalonamentoRentabilidadeCurva2', label: 'Escalonamento - Rentabilidade/Indexador/Taxa Flutuante (Curva2)' },
  { key: 'escalonamentoCriterioCalculoJurosCurva2', label: 'Escalonamento - Critério Cálculo de Juros (Curva2)' },
  { key: 'escalonamentoTaxaJurosSpreadCurva3', label: 'Escalonamento - Taxa de Juros/Spread (Curva3)' },
  // Linha 5
  { key: 'criterioCalculoJuros', label: 'Critério de Cálculo de Juros' },
  { key: 'escalonamentoPeriodicidadeCorrecaoCurva2', label: 'Escalonamento - Periodicidade de Correção (Curva2)' },
  { key: 'escalonamentoRentabilidadeCurva3', label: 'Escalonamento - Rentabilidade/Indexador/Taxa Flutuante (Curva3)' },
  { key: 'escalonamentoCriterioCalculoJurosCurva3', label: 'Escalonamento - Critério Cálculo de Juros (Curva3)' },
  // Linha 6
  { key: 'periodicidadeCorrecaoIndicesPreco', label: 'Periodicidade de Correção - Índices de Preço' },
  { key: 'escalonamentoProRataCorrecaoCurva2', label: 'Escalonamento - Pró-Rata da Correção (Curva2)' },
  { key: 'escalonamentoPeriodicidadeCorrecaoCurva3', label: 'Escalonamento - Periodicidade de Correção (Curva3)' },
];

/**
 * Campos comuns para CFF (Cotas de Fundos Fechados)
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const CFF_ATIVO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'fundoNomeSimplificado', label: 'Fundo (Nome Simplificado)' },
  { key: 'administradorNomeSimplificado', label: 'Administrador (Nome Simplificado)' },
  { key: 'nivelSubordinacao', label: 'Nível de Subordinação' },
  { key: 'tipoRegime', label: 'Tipo de Regime' },
  // Linha 2
  { key: 'fundoRazaoSocial', label: 'Fundo (Razão Social)' },
  { key: 'administradorRazaoSocial', label: 'Administrador (Razão Social)' },
  { key: 'emissao', label: 'Emissão' },
  { key: 'eventosCursadosB3', label: 'Eventos Cursados pela B3?' },
  // Linha 3
  { key: 'fundoConta', label: 'Fundo (Conta)' },
  { key: 'administradorConta', label: 'Administrador (Conta)' },
  { key: 'serie', label: 'Série' },
  { key: 'respLancamentoDepositoRetirada', label: 'Resp. pelo Lançamento Depósito/Retirada' },
  // Linha 4
  { key: 'cnpjFundo', label: 'CNPJ do Fundo' },
  { key: 'gestorNomeSimplificado', label: 'Gestor (Nome Simplificado)' },
  { key: 'codigoISIN', label: 'Código ISIN' },
  { key: 'situacao', label: 'Situação' },
  // Linha 5
  { key: 'tipoFundo', label: 'Tipo Fundo' },
  { key: 'gestorNomeRazaoSocial', label: 'Gestor (Nome/Razão Social)' },
  { key: 'codigoANBIMA', label: 'Código ANBIMA' },
  { key: 'inadimplente', label: 'Inadimplente' },
  // Linha 6
  { key: 'codigoAtivo', label: 'Código do Ativo' },
  { key: 'gestorConta', label: 'Gestor (Conta)' },
  { key: 'nomeSubclasse', label: 'Nome da Subclasse' },
  { key: 'motivoStatus', label: 'Motivo do Status' },
  // Linha 7
  { key: 'apelido', label: 'Apelido', editable: true },
  { key: 'gestorCpfCnpj', label: 'Gestor (CPF/ CNPJ)' },
  { key: 'codigoCVMSubclasse', label: 'Código CVM da Subclasse' },
  { key: 'descricaoFundo', label: 'Descrição do Fundo' },
  // Linha 8
  { key: 'tipoRegime2', label: 'Tipo de Regime' },
  { key: 'escrituradorNomeSimplificado', label: 'Escriturador (Nome Simplificado)' },
  { key: 'destinacaoRecursoLei12431', label: 'Destinação do Recurso (Lei 12.431)' },
  { key: 'tipoDistribuicao', label: 'Tipo de Distribuição' },
  // Linha 9
  { key: 'tipoInstrumentoFinanceiro', label: 'Tipo de Instrumento Financeiro' },
  { key: 'escrituradorRazaoSocial', label: 'Escriturador (Razão Social)' },
  { key: 'artigoLei12431', label: 'Artigo Lei 12.431' },
  { key: 'ritoOferta', label: 'Rito da Oferta' },
  // Linha 10
  { key: 'especificacaoAutomaticaCotas', label: 'Especificação Automática de Cotas' },
  { key: 'escrituradorConta', label: 'Escriturador (Conta)' },
  { key: 'cotasNegociaveisMercadoSecundario', label: 'Cotas Negociáveis Mercado Secundário' },
  { key: 'esforcoRestrito', label: 'Esforço Restrito' },
  // Linha 11
  { key: 'dataEmissao', label: 'Data de Emissão' },
  { key: 'custodianteNomeSimplificado', label: 'Custodiante (Nome Simplificado)' },
  { key: 'fundoExclusivo', label: 'Fundo Exclusivo' },
  { key: 'publicoOferta', label: 'Público da oferta' },
  // Linha 12
  { key: 'dataVencimento', label: 'Data de Vencimento' },
  { key: 'custodianteRazaoSocial', label: 'Custodiante (Razão Social)' },
  { key: 'custoCustodia', label: 'Custo de Custódia' },
  { key: 'admiteSubscricaoSemIntegralizacao', label: 'Admite Subscrição Sem a Integralização?' },
];

/**
 * Campos da seção "Dados do Título Sustentável" para CFF
 */
const CFF_TITULO_SUSTENTAVEL_FIELDS: DetailField[] = [
  { key: 'tituloSustentavel', label: 'Título Sustentável' },
  { key: 'certificadoPor', label: 'Certificado por' },
  { key: 'dataVerificacao', label: 'Data de Verificação' },
  { key: 'padrao', label: 'Padrão' },
];

/**
 * Campos da seção "Negociação de Valores Mobiliários" para CFF
 */
const CFF_NEGOCIACAO_FIELDS: DetailField[] = [
  { key: 'admitidoNegociacao', label: 'Admitido à negociação' },
  { key: 'statusNegociacao', label: 'Status de Negociação' },
  { key: 'motivoBloqueioRestricao', label: 'Motivo do bloqueio/restrição' },
];

/**
 * Campos comuns para CBIO
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const CBIO_ATIVO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'codigoIF', label: 'Código IF' },
  { key: 'registradorConta', label: 'Registrador (Conta)' },
  { key: 'dataResgate', label: 'Data de Resgate' },
  { key: 'codigoNotaANP', label: 'Código Nota ANP' },
  // Linha 2
  { key: 'apelido', label: 'Apelido', editable: true },
  { key: 'quantidadeEmitida', label: 'Quantidade Emitida' },
  { key: 'dataRegistro', label: 'Data de Registro' },
  { key: 'descricaoAdicional', label: 'Descrição Adicional' },
  // Linha 3
  { key: 'dataEmissao', label: 'Data de Emissão' },
  { key: 'quantidadeAposentada', label: 'Quantidade Aposentada' },
];

/**
 * Configurações por tipo de ativo
 */
export const ASSET_TYPE_CONFIGS: Record<string, AssetTypeConfig> = {
  DEB: {
    sections: [
      { id: 'ativo', title: 'Ativo', fields: DEB_ATIVO_FIELDS },
      { id: 'quantidade', title: 'Quantidade', fields: DEB_QUANTIDADE_FIELDS },
      { id: 'valores', title: 'Valores', fields: DEB_VALORES_FIELDS },
      { id: 'remuneracao', title: 'Remuneração', fields: DEB_REMUNERACAO_FIELDS },
      { id: 'juros-spread', title: 'Juros/Spread', fields: DEB_JUROS_SPREAD_FIELDS },
      { id: 'amortizacao', title: 'Amortização', fields: DEB_AMORTIZACAO_FIELDS },
      { id: 'distribuicao', title: 'Distribuição', fields: DEB_DISTRIBUICAO_FIELDS },
      { id: 'titulo-sustentavel', title: 'Dados do Título Sustentável', fields: DEB_TITULO_SUSTENTAVEL_FIELDS },
      { id: 'negociacao', title: 'Negociação de Valores Mobiliários', fields: DEB_NEGOCIACAO_FIELDS },
    ],
  },
  CRI: {
    sections: [
      { id: 'ativo', title: 'Ativo', fields: CRI_CRA_ATIVO_FIELDS },
      { id: 'emissao-registro', title: 'Dados da Emissão e Registro', fields: CRI_CRA_EMISSAO_REGISTRO_FIELDS },
      { id: 'formas-pagamento', title: 'Formas de Pagamento', fields: CRI_CRA_FORMAS_PAGAMENTO_FIELDS },
      { id: 'juros-amortizados', title: 'Formas de Pagamento e Juros Amortizados', fields: CRI_CRA_JUROS_AMORTIZADOS_FIELDS },
      { id: 'complemento-icvm', title: 'Complemento para Anexo II do ICVM 414/04', fields: CRI_CRA_COMPLEMENTO_ICVM_FIELDS },
      { id: 'autorizacao-registro', title: 'Autorização de Registro', fields: CRI_CRA_AUTORIZACAO_REGISTRO_FIELDS },
      { id: 'banco-liquidante', title: 'Banco Liquidante', fields: CRI_CRA_BANCO_LIQUIDANTE_FIELDS },
      { id: 'agente-fiduciario', title: 'Agente Fiduciário', fields: CRI_CRA_AGENTE_FIDUCIARIO_FIELDS },
      { id: 'securitizacao', title: 'Securitização', fields: CRI_CRA_SECURITIZACAO_FIELDS },
      { id: 'classificacao-risco', title: 'Classificação de Risco', fields: CRI_CRA_CLASSIFICACAO_RISCO_FIELDS },
      { id: 'titulo-sustentavel', title: 'Dados do Título Sustentável', fields: CRI_CRA_TITULO_SUSTENTAVEL_FIELDS },
    ],
  },
  CRA: {
    sections: [
      { id: 'ativo', title: 'Ativo', fields: CRI_CRA_ATIVO_FIELDS },
      { id: 'emissao-registro', title: 'Dados da Emissão e Registro', fields: CRI_CRA_EMISSAO_REGISTRO_FIELDS },
      { id: 'formas-pagamento', title: 'Formas de Pagamento', fields: CRI_CRA_FORMAS_PAGAMENTO_FIELDS },
      { id: 'juros-amortizados', title: 'Formas de Pagamento e Juros Amortizados', fields: CRI_CRA_JUROS_AMORTIZADOS_FIELDS },
      { id: 'complemento-icvm', title: 'Complemento para Anexo II do ICVM 414/04', fields: CRI_CRA_COMPLEMENTO_ICVM_FIELDS },
      { id: 'autorizacao-registro', title: 'Autorização de Registro', fields: CRI_CRA_AUTORIZACAO_REGISTRO_FIELDS },
      { id: 'banco-liquidante', title: 'Banco Liquidante', fields: CRI_CRA_BANCO_LIQUIDANTE_FIELDS },
      { id: 'agente-fiduciario', title: 'Agente Fiduciário', fields: CRI_CRA_AGENTE_FIDUCIARIO_FIELDS },
      { id: 'securitizacao', title: 'Securitização', fields: CRI_CRA_SECURITIZACAO_FIELDS },
      { id: 'classificacao-risco', title: 'Classificação de Risco', fields: CRI_CRA_CLASSIFICACAO_RISCO_FIELDS },
      { id: 'titulo-sustentavel', title: 'Dados do Título Sustentável', fields: CRI_CRA_TITULO_SUSTENTAVEL_FIELDS },
    ],
  },
  CDB: {
    sections: [
      { id: 'ativo', title: 'Ativo', fields: CDB_ATIVO_FIELDS },
      { id: 'emissao-registro', title: 'Dados da Emissão e Registro', fields: CDB_EMISSAO_REGISTRO_FIELDS },
      { id: 'valores-atualizados', title: 'Valores Atualizados', fields: CDB_VALORES_ATUALIZADOS_FIELDS },
      { id: 'forma-pagamento', title: 'Forma de Pagamento', fields: CDB_FORMA_PAGAMENTO_FIELDS },
    ],
  },
  LF: {
    sections: [
      { id: 'ativo', title: 'Ativo', fields: LF_ATIVO_FIELDS },
      { id: 'emissao-registro', title: 'Dados da Emissão e Registro', fields: LF_EMISSAO_REGISTRO_FIELDS },
      { id: 'valores-atualizados', title: 'Valores Atualizados', fields: LF_VALORES_ATUALIZADOS_FIELDS },
      { id: 'classificadora-risco', title: 'Classificadora(s) de Risco', fields: LF_CLASSIFICADORA_RISCO_FIELDS },
      { id: 'autorizacao-cvm', title: 'Autorização de Registro CVM', fields: LF_AUTORIZACAO_CVM_FIELDS },
      { id: 'forma-pagamento', title: 'Forma de Pagamento', fields: LF_FORMA_PAGAMENTO_FIELDS },
    ],
  },
  LCI: {
    sections: [
      { id: 'ativo', title: 'Ativo', fields: LCI_LCA_ATIVO_FIELDS },
      { id: 'emissao-registro', title: 'Dados da Emissão e Registro', fields: LCI_LCA_EMISSAO_REGISTRO_FIELDS },
      { id: 'titulo-prazo-decorrido', title: 'Título Registrado com Prazo Decorrido', fields: LCI_LCA_TITULO_PRAZO_DECORRIDO_FIELDS },
      { id: 'forma-pagamento', title: 'Forma de Pagamento', fields: LCI_LCA_FORMA_PAGAMENTO_FIELDS },
      { id: 'titulo-sustentavel', title: 'Dados do Título Sustentável', fields: LCI_LCA_TITULO_SUSTENTAVEL_FIELDS },
    ],
  },
  LCA: {
    sections: [
      { id: 'ativo', title: 'Ativo', fields: LCI_LCA_ATIVO_FIELDS },
      { id: 'emissao-registro', title: 'Dados da Emissão e Registro', fields: LCI_LCA_EMISSAO_REGISTRO_FIELDS },
      { id: 'titulo-prazo-decorrido', title: 'Título Registrado com Prazo Decorrido', fields: LCI_LCA_TITULO_PRAZO_DECORRIDO_FIELDS },
      { id: 'forma-pagamento', title: 'Forma de Pagamento', fields: LCI_LCA_FORMA_PAGAMENTO_FIELDS },
      { id: 'titulo-sustentavel', title: 'Dados do Título Sustentável', fields: LCI_LCA_TITULO_SUSTENTAVEL_FIELDS },
    ],
  },
  CFF: {
    sections: [
      { id: 'ativo', title: 'Ativo', fields: CFF_ATIVO_FIELDS },
      { id: 'titulo-sustentavel', title: 'Dados do Título Sustentável', fields: CFF_TITULO_SUSTENTAVEL_FIELDS },
      { id: 'negociacao', title: 'Negociação de Valores Mobiliários', fields: CFF_NEGOCIACAO_FIELDS },
    ],
  },
  CBIO: {
    sections: [
      { id: 'ativo', title: 'Ativo', fields: CBIO_ATIVO_FIELDS },
    ],
  },
};

/**
 * Configuração padrão para tipos não mapeados
 */
export const DEFAULT_ASSET_CONFIG: AssetTypeConfig = {
  sections: [
    {
      id: 'ativo',
      title: 'Ativo',
      fields: [
        { key: 'codigo', label: 'Código do Ativo' },
        { key: 'apelido', label: 'Apelido' },
        { key: 'dataEmissao', label: 'Data de Emissão' },
        { key: 'dataVencimento', label: 'Data de Vencimento' },
        { key: 'emissor', label: 'Emissor (Razão Social)' },
        { key: 'status', label: 'Status' },
        { key: 'codigoISIN', label: 'ISIN' },
      ],
    },
  ],
};

/**
 * Retorna a configuração para um tipo de ativo
 */
export function getAssetTypeConfig(tipo: string): AssetTypeConfig {
  const normalizedType = tipo?.toUpperCase() || '';
  return ASSET_TYPE_CONFIGS[normalizedType] || DEFAULT_ASSET_CONFIG;
}
