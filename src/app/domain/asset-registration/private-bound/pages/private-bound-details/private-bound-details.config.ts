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
  { key: 'tickerSymbol', label: 'Código do Ativo' },
  { key: 'emissionRestrictedWorkIndicator', label: 'Esforço Restrito' },
  { key: 'issueDate', label: 'Data de Emissão' },
  { key: 'securitizationDebentureInd', label: 'Debênture de securitização' },
  // Linha 2
  { key: 'tickerSymbolSurname', label: 'Apelido', editable: true },
  { key: 'law12431SupportIndicator', label: 'Debênture Incentivada' },
  { key: 'maturityDate', label: 'Data de Vencimento' },
  { key: 'b3EventAttendedIndicator', label: 'Eventos Cursados na B3?' },
  // Linha 3
  { key: 'issuerCorporationName', label: 'Emissor (Razão Social)' },
  { key: 'law12431SupportRuleCode', label: 'Regra do Incentivo' },
  { key: 'classTypeName', label: 'Classe' },
  { key: 'offerRitual', label: 'Rito de Oferta' },
  // Linha 4
  { key: 'issuerDocumentNumber', label: 'Emissor (CNPJ)' },
  { key: 'instrumentStatusDescription', label: 'Status da Debênture' },
  { key: 'nonPaymentIndicator', label: 'Instrumento Vencido e Inadimplido' },
  { key: 'financialStatmentPendingInd', label: 'Pendente de Demonstração Financeiro' },
  // Linha 5
  { key: 'issueNumber', label: 'Emissão' },
  { key: 'updateLastDate', label: 'Data Última Alteração' },
  { key: 'fiduciaryAgentName', label: 'Agente Fiduciário' },
  { key: 'earlyRedemptionIndicator', label: 'Possibilidade de Resgate Antecipado?' },
  // Linha 6
  { key: 'issueTypeName', label: 'Tipo de Emissão' },
  { key: 'otcAccountBookkeeperShortName', label: 'Escriturador/Emissor (Nome Simples)' },
  { key: 'seriesIdentificationCode', label: 'Série' },
  { key: 'isinCode', label: 'ISIN' },
  // Linha 7
  { key: 'scripturalEmissionName', label: 'Forma' },
  { key: 'collateralTypeName', label: 'Garantia/Espécie' },
  { key: 'regimeTypeName', label: 'Tipo de Regime' },
  { key: 'subscriptionPaymentIndicator', label: 'Admite Subscrição sem a Integralização?' },
];

/**
 * Campos da seção "Quantidade" para Debêntures
 */
const DEB_QUANTIDADE_FIELDS: DetailField[] = [
  { key: 'issueQuantity', label: 'Quantidade Emitida' },
  { key: 'redemptionQuantity', label: 'Quantidade Resgatada' },
  { key: 'depositQuantity', label: 'Quantidade Depositada' },
];

/**
 * Campos da seção "Valores" para Debêntures
 */
const DEB_VALORES_FIELDS: DetailField[] = [
  { key: 'nominalUnitValue', label: 'Valor Nominal Unitário na Emissão (R$)' },
  { key: 'updatedNominalValue', label: 'Valor Nominal Atualizado' },
  { key: 'issueTotalValue', label: 'Valor Total da Emissão (R$)' },
  { key: 'nominalValueReferenceDate', label: 'Valor Atualizado em' },
];

/**
 * Campos da seção "Remuneração" para Debêntures
 */
const DEB_REMUNERACAO_FIELDS: DetailField[] = [
  { key: 'sndIndicator', label: 'Padrão SND' },
  { key: 'indexShortName', label: 'Índice' },
  { key: 'profitabilityPercentage', label: 'Rentabilidade / Multiplicador (%)' },
  { key: 'adjustmentFrequencyDayQuantity', label: 'Periodicidade em Dias' },
  { key: 'profitabilityStartDate', label: 'Data de Início de Rentabilidade' },
  { key: 'adjustmentFrequencyDay', label: 'Dia de Referência p/Índice de Preços' },
  { key: 'curveCalculationIndicator', label: 'Calcula Curva' },
  { key: 'projectionTypeCode', label: 'Tipo de Projeção' },
  { key: 'nominalValueAdjustmentIndicator', label: 'Corrige o Valor Nominal' },
];

/**
 * Campos da seção "Juros/Spread" para Debêntures
 */
const DEB_JUROS_SPREAD_FIELDS: DetailField[] = [
  { key: 'eventRateValue', label: 'Taxa' },
  { key: 'interestPaymentStartDate', label: 'A partir de' },
  { key: 'interestPaymentFrequency', label: 'A cada' },
  { key: 'interestPaymentIndicator', label: 'Incorpora ao Principal' },
];

/**
 * Campos da seção "Amortização" para Debêntures
 */
const DEB_AMORTIZACAO_FIELDS: DetailField[] = [
  { key: 'amortizationPaymentType', label: 'Tipo de Amortização' },
  { key: 'amortizationStartDate', label: 'A partir de' },
  { key: 'amortizationFrequency', label: 'A cada' },
];

/**
 * Campos da seção "Distribuição" para Debêntures
 */
const DEB_DISTRIBUICAO_FIELDS: DetailField[] = [
  { key: 'distributionStartDate', label: 'Data Início de Distribuição' },
  { key: 'distributionEndDate', label: 'Data Fim de Distribuição' },
];

/**
 * Campos da seção "Dados do Título Sustentável"
 */
const DEB_TITULO_SUSTENTAVEL_FIELDS: DetailField[] = [
  { key: 'tickerSustainable', label: 'Título Sustentável' },
];

/**
 * Campos da seção "Negociação de Valores Mobiliários"
 */
const DEB_NEGOCIACAO_FIELDS: DetailField[] = [
  { key: 'tradingAdimittedInd', label: 'Admitido à negociação' },
  { key: 'negociationStatus', label: 'Status Negociação' },
  { key: 'blockingReason', label: 'Motivos de bloqueio / restrição' },
];

/**
 * Campos comuns para CRI/CRA
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const CRI_CRA_ATIVO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'tickerSymbol', label: 'Código IF' },
  { key: 'otcAccountBookkeeperShortName', label: 'Nome Simplificado do Agente de Pagamento' },
  { key: 'collateralTypeName', label: 'Coobrigação' },
  { key: 'offerRitual', label: 'Rito de Oferta' },
  // Linha 2
  { key: 'tickerSymbolSurname', label: 'Apelido', editable: true },
  { key: 'issueDate', label: 'Data de Emissão' },
  { key: 'earlyRedemptionIndicator', label: 'Possibilidade de Resgate Antecipado' },
  { key: 'instrumentStatusDescription', label: 'Situação' },
  // Linha 3
  { key: 'issuerCorporationName', label: 'Conta Emissor/Registrador' },
  { key: 'maturityDate', label: 'Data de Vencimento' },
  { key: 'nonPaymentIndicator', label: 'Instrumento Vencido e Inadimplido' },
  { key: 'issuerDocumentNumber', label: 'Nome Simplificado Emissor/Registrador' },
  // Linha 4
  { key: 'profitabilityStartDate', label: 'Data Início de Rentabilidade' },
  { key: 'regimeTypeName', label: 'Tipo de Regime' },
  { key: 'nonPaymentIndicator', label: 'IF Inadimplente' },
  { key: 'fiduciaryAgentName', label: 'Conta Escriturador' },
  // Linha 5
  { key: 'isinCode', label: 'Código ISIN' },
  { key: 'b3EventAttendedIndicator', label: 'Eventos Cursados na B3?' },
  { key: 'updateLastDate', label: 'Data de Registro' },
  { key: 'otcAccountBookkeeperShortName', label: 'Nome Simplificado Escriturador' },
  // Linha 6
  { key: 'regimeTypeName', label: 'Regime Fiduciário' },
  { key: 'issueTypeName', label: 'Público da Oferta' },
  { key: 'updateLastDate', label: 'Data de Alteração' },
  { key: 'fiduciaryAgentName', label: 'Conta do Agente de Pagamento' },
];

/**
 * Campos da seção "Dados da Emissão e Registro" para CRI/CRA
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const CRI_CRA_EMISSAO_REGISTRO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'issueNumber', label: 'Emissão' },
  { key: 'depositQuantity', label: 'Quantidade Depositada' },
  { key: 'nominalUnitValue', label: 'Valor de (Original)' },
  { key: 'seriesIdentificationCode', label: 'Série' },
  // Linha 2
  { key: 'issueTotalValue', label: 'Valor Financeiro da Emissão (R$)' },
  { key: 'nominalValueReferenceDate', label: 'Data (em)' },
  { key: 'classTypeName', label: 'Tipo da Série' },
  { key: 'issueQuantity', label: 'Quantidade Emitida' },
  // Linha 3
  { key: 'redemptionQuantity', label: 'Quantidade Resgatada' },
  { key: 'emissionRestrictedWorkIndicator', label: 'Esforço Restrito' },
  { key: 'distributionEndDate', label: 'Distribuição encerra em' },
  { key: 'nominalUnitValue', label: 'Valor Unitário da Emissão' },
];

/**
 * Campos da seção "Formas de Pagamento" para CRI/CRA
 */
const CRI_CRA_FORMAS_PAGAMENTO_FIELDS: DetailField[] = [
  { key: 'interestPaymentFrequency', label: 'Forma de Pagamento' },
  { key: 'indexShortName', label: 'Índice' },
  { key: 'profitabilityPercentage', label: '% da Taxa Flutuante' },
  { key: 'eventRateValue', label: 'Taxa' },
];

/**
 * Campos da seção "Formas de Pagamento e Juros Amortizados" para CRI/CRA
 */
const CRI_CRA_JUROS_AMORTIZADOS_FIELDS: DetailField[] = [
  { key: 'amortizationPaymentType', label: 'Tipo de Amortização' },
  { key: 'updatedNominalValue', label: 'Valor Unitário de Emissão Atualizado' },
  { key: 'nominalUnitValue', label: 'Preço Unitário Atualizado' },
  { key: 'nominalValueReferenceDate', label: 'Valor de (Base de Cálculo)' },
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
  { key: 'tickerSustainable', label: 'Título Sustentável' },
];

/**
 * Campos comuns para CDB
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const CDB_ATIVO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'tickerSymbolTypeCode', label: 'Tipo' },
  { key: 'instrumentStatusDescription', label: 'Situação' },
  { key: 'issuerCorporationName', label: 'Conta do Emissor' },
  { key: 'maturityDate', label: 'Data Vencimento' },
  // Linha 2
  { key: 'tickerSymbol', label: 'Código IF' },
  { key: 'nonPaymentIndicator', label: 'IF Inadimplente' },
  { key: 'otcAccountBookkeeperShortName', label: 'Nome Simplificado Emissor' },
  { key: 'adjustmentFrequencyDayQuantity', label: 'Prazo emissão' },
  // Linha 3
  { key: 'tickerSymbolSurname', label: 'Apelido', editable: true },
  { key: 'updateLastDate', label: 'Data de Registro' },
  { key: 'issueDate', label: 'Data Emissão' },
  { key: 'regimeTypeName', label: 'Tipo Regime' },
  // Linha 4
  { key: 'isinCode', label: 'Código ISIN' },
  { key: 'updateLastDate', label: 'Data de Alteração' },
];

/**
 * Campos comuns para LF (Letra Financeira)
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const LF_ATIVO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'tickerSymbol', label: 'Código IF' },
  { key: 'issuerCorporationName', label: 'Conta do Emissor' },
  { key: 'issueDate', label: 'Data de Emissão' },
  { key: 'nonPaymentIndicator', label: 'IF Inadimplente' },
  // Linha 2
  { key: 'tickerSymbolSurname', label: 'Apelido', editable: true },
  { key: 'otcAccountBookkeeperShortName', label: 'Nome Simplificado do Emissor' },
  { key: 'maturityDate', label: 'Data de Vencimento' },
  { key: 'updateLastDate', label: 'Data de Registro' },
  // Linha 3
  { key: 'isinCode', label: 'Código ISIN' },
  { key: 'issuerCorporationName', label: 'Razão Social do Emissor' },
  { key: 'adjustmentFrequencyDayQuantity', label: 'Prazo de Emissão' },
  { key: 'updateLastDate', label: 'Data de Alteração' },
  // Linha 4
  { key: 'instrumentStatusDescription', label: 'Situação' },
];

/**
 * Campos da seção "Dados da Emissão e Registro" para LF
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const LF_EMISSAO_REGISTRO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'issueQuantity', label: 'Quantidade Emitida' },
  { key: 'issueTotalValue', label: 'Valor Financeiro de Emissão' },
  { key: 'issueTypeName', label: 'Modelo da Distribuição' },
  { key: 'emissionRestrictedWorkIndicator', label: 'Esforço Restrito' },
  // Linha 2
  { key: 'depositQuantity', label: 'Quantidade Depositada' },
  { key: 'nominalUnitValue', label: 'Valor de (Original)' },
  { key: 'distributionStartDate', label: 'Data de Início de Distribuição' },
  { key: 'regimeTypeName', label: 'Tipo de Regime' },
  // Linha 3
  { key: 'redemptionQuantity', label: 'Quantidade Resgatada' },
  { key: 'classTypeName', label: 'Descrição Adicional' },
  { key: 'distributionEndDate', label: 'Data Fim de Distribuição' },
  { key: 'b3EventAttendedIndicator', label: 'Eventos Cursados pela B3?' },
  // Linha 4
  { key: 'nominalUnitValue', label: 'Valor Unitário de Emissão' },
  { key: 'issueTypeName', label: 'Distribuição Pública' },
  { key: 'fiduciaryAgentName', label: 'Coodernador Líder' },
  { key: 'otcAccountBookkeeperShortName', label: 'Conta Escriturador/Emissor' },
];

/**
 * Campos da seção "Valores Atualizados" para LF
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const LF_VALORES_ATUALIZADOS_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'nominalValueReferenceDate', label: 'Valor de (Base de Cálculo)' },
  { key: 'updatedNominalValue', label: 'Preço Unitário Atualizado' },
  { key: 'issueDate', label: 'Data Emissão Unitário' },
  { key: 'nominalValueReferenceDate', label: 'Data Preço Unitário' },
  // Linha 2
  { key: 'updatedNominalValue', label: 'Valor Unitário de Emissão Atualizado' },
  { key: 'issueTotalValue', label: 'Valor Financeiro Atualizado' },
  { key: 'interestPaymentStartDate', label: 'Data Unitário Juros' },
  { key: 'nominalValueReferenceDate', label: 'Data Financeiro' },
  // Linha 3
  { key: 'eventRateValue', label: 'Preço Unitário de Juros' },
  { key: 'nominalValueReferenceDate', label: 'Data Valor (Base de Cálculo)' },
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
  { key: 'tickerSymbolTypeCode', label: 'Tipo' },
  { key: 'instrumentStatusDescription', label: 'Situação' },
  { key: 'nominalUnitValue', label: 'Valor Nominal unitário' },
  { key: 'earlyRedemptionIndicator', label: 'Manut. Unilateral das Garantias pelo Emissor' },
  // Linha 2
  { key: 'tickerSymbolSurname', label: 'Apelido', editable: true },
  { key: 'updateLastDate', label: 'Data de Registro' },
  { key: 'indexShortName', label: 'Índice' },
  { key: 'earlyRedemptionIndicator', label: 'Condição de Resgate Antecipado' },
  // Linha 3
  { key: 'tickerSymbol', label: 'Código IF' },
  { key: 'issueDate', label: 'Data de Emissão' },
  { key: 'collateralTypeName', label: 'Cesta de Garantias' },
  { key: 'earlyRedemptionIndicator', label: 'Cláusula de Resgate pelo Emissor' },
  // Linha 4
  { key: 'isinCode', label: 'Código ISIN' },
  { key: 'regimeTypeName', label: 'Tipo de Regime' },
  { key: 'collateralTypeName', label: 'Obs. Cesta' },
  { key: 'seriesIdentificationCode', label: 'Lote' },
  // Linha 5
  { key: 'otcAccountBookkeeperShortName', label: 'Nome Simplificado do Registrador/ Emissor' },
  { key: 'maturityDate', label: 'Data de Vencimento' },
  { key: 'updateLastDate', label: 'Data Últ. Alteração' },
  { key: 'fiduciaryAgentName', label: 'Veículo Garantidor' },
  // Linha 6
  { key: 'issuerCorporationName', label: 'Registrador/ Emissor' },
  { key: 'collateralTypeName', label: 'Tipo de Garantia' },
  { key: 'earlyRedemptionIndicator', label: 'Liquidação Antecipada' },
];

/**
 * Campos da seção "Dados da Emissão e Registro" para LCI/LCA
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const LCI_LCA_EMISSAO_REGISTRO_FIELDS: DetailField[] = [
  { key: 'issueQuantity', label: 'Quantidade Emitida' },
  { key: 'depositQuantity', label: 'Quantidade Depositada' },
  { key: 'redemptionQuantity', label: 'Quantidade Resgatada' },
];

/**
 * Campos da seção "Título Registrado com Prazo Decorrido" para LCI/LCA
 */
const LCI_LCA_TITULO_PRAZO_DECORRIDO_FIELDS: DetailField[] = [
  { key: 'nominalUnitValue', label: 'Valor de (Unitário)' },
  { key: 'nominalValueReferenceDate', label: 'Data' },
];

/**
 * Campos da seção "Forma de Pagamento" para LCI/LCA
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const LCI_LCA_FORMA_PAGAMENTO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'interestPaymentFrequency', label: 'Forma de Pagamento' },
  { key: 'interestPaymentIndicator', label: 'Incorpora Juros' },
  { key: 'eventRateValue', label: 'Preço Unitário de Juros' },
  { key: 'profitabilityPercentage', label: '% Índice/ Taxa Flutuante' },
  // Linha 2
  { key: 'interestPaymentStartDate', label: 'Data' },
  { key: 'updatedNominalValue', label: 'Preço Unitário Atualizado' },
  { key: 'eventRateValue', label: 'Taxa de Juros/ Spread' },
  { key: 'interestPaymentIndicator', label: 'Valor após Incorporação de Juros' },
  // Linha 3
  { key: 'issueTotalValue', label: 'Valor Financeiro Atualizado' },
  { key: 'curveCalculationIndicator', label: 'Critério de Calculo de Juros' },
  { key: 'updatedNominalValue', label: 'Valor Unitário de Emissão Atualizado' },
];

/**
 * Campos da seção "Dados do Título Sustentável" para LCI/LCA
 */
const LCI_LCA_TITULO_SUSTENTAVEL_FIELDS: DetailField[] = [
  { key: 'tickerSustainable', label: 'Título Sustentável' },
  { key: 'fiduciaryAgentName', label: 'Certificado por' },
  { key: 'updateLastDate', label: 'Data de Verificação' },
];

/**
 * Campos da seção "Dados da Emissão e Registro" para CDB
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const CDB_EMISSAO_REGISTRO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'issueQuantity', label: 'Quantidade Emitida' },
  { key: 'nominalUnitValue', label: 'Valor Unitário de Emissão' },
  { key: 'issueTotalValue', label: 'Valor Financeiro de Resgate' },
  { key: 'earlyRedemptionIndicator', label: 'Condição de Resgate Antecipado' },
  // Linha 2
  { key: 'depositQuantity', label: 'Quantidade Depositada' },
  { key: 'issueTotalValue', label: 'Valor Financeiro de Emissão' },
  { key: 'nominalUnitValue', label: 'Valor de (Original)' },
  { key: 'classTypeName', label: 'Descrição Adicional' },
  // Linha 3
  { key: 'redemptionQuantity', label: 'Quantidade Resgatada' },
  { key: 'updatedNominalValue', label: 'Valor Unitário do Resgate' },
  { key: 'issueDate', label: 'Data' },
  { key: 'seriesIdentificationCode', label: 'Controle Interno' },
];

/**
 * Campos da seção "Valores Atualizados" para CDB
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const CDB_VALORES_ATUALIZADOS_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'nominalValueReferenceDate', label: 'Valor de (Base de Cálculo)' },
  { key: 'issueDate', label: 'Data Emissão Unitário' },
  { key: 'updatedNominalValue', label: 'Preço Unitário Atualizado' },
  { key: 'issueTotalValue', label: 'Valor Financeiro Atualizado' },
  // Linha 2
  { key: 'nominalValueReferenceDate', label: 'Data Valor' },
  { key: 'eventRateValue', label: 'Preço Unitário de Juros' },
  { key: 'nominalValueReferenceDate', label: 'Data Unitário' },
  { key: 'nominalValueReferenceDate', label: 'Data Financeiro' },
  // Linha 3
  { key: 'updatedNominalValue', label: 'Valor Unitário de Emissão Atualizado' },
  { key: 'interestPaymentStartDate', label: 'Data Unitário de Juros' },
];

/**
 * Campos da seção "Forma de Pagamento" para CDB
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const CDB_FORMA_PAGAMENTO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'interestPaymentFrequency', label: 'Forma de Pagamento' },
  { key: 'nominalValueAdjustmentIndicator', label: 'Pró-Rata da Correção - Índices de Preço' },
  { key: 'projectionTypeCode', label: 'Escalonamento - Tipo de Correção (Curva2)' },
  { key: 'nominalValueAdjustmentIndicator', label: 'Escalonamento - Pró-Rata da Correção (Curva3)' },
  // Linha 2
  { key: 'indexShortName', label: 'Rentabilidade/ Indexador/ Taxa Flutuante' },
  { key: 'curveCalculationIndicator', label: 'Escalonamento' },
  { key: 'profitabilityPercentage', label: 'Escalonamento - % da Taxa Flutuante (Curva2)' },
  { key: 'projectionTypeCode', label: 'Escalonamento - Tipo de Correção (Curva3)' },
  // Linha 3
  { key: 'profitabilityPercentage', label: '% Índice/ Taxa Flutuante' },
  { key: 'curveCalculationIndicator', label: 'Escalonamento - Múltiplas Curvas' },
  { key: 'eventRateValue', label: 'Escalonamento - Taxa de Juros/Spread (Curva2)' },
  { key: 'profitabilityPercentage', label: 'Escalonamento - % da Taxa Flutuante (Curva3)' },
  // Linha 4
  { key: 'eventRateValue', label: 'Taxa de Juros/ Spread' },
  { key: 'indexShortName', label: 'Escalonamento - Rentabilidade/Indexador/Taxa Flutuante (Curva2)' },
  { key: 'curveCalculationIndicator', label: 'Escalonamento - Critério Cálculo de Juros (Curva2)' },
  { key: 'eventRateValue', label: 'Escalonamento - Taxa de Juros/Spread (Curva3)' },
  // Linha 5
  { key: 'curveCalculationIndicator', label: 'Critério de Cálculo de Juros' },
  { key: 'adjustmentFrequencyDayQuantity', label: 'Escalonamento - Periodicidade de Correção (Curva2)' },
  { key: 'indexShortName', label: 'Escalonamento - Rentabilidade/Indexador/Taxa Flutuante (Curva3)' },
  { key: 'curveCalculationIndicator', label: 'Escalonamento - Critério Cálculo de Juros (Curva3)' },
  // Linha 6
  { key: 'adjustmentFrequencyDayQuantity', label: 'Periodicidade de Correção - Índices de Preço' },
  { key: 'nominalValueAdjustmentIndicator', label: 'Escalonamento - Pró-Rata da Correção (Curva2)' },
  { key: 'adjustmentFrequencyDayQuantity', label: 'Escalonamento - Periodicidade de Correção (Curva3)' },
];

/**
 * Campos comuns para CFF (Cotas de Fundos Fechados)
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const CFF_ATIVO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'otcAccountBookkeeperShortName', label: 'Fundo (Nome Simplificado)' },
  { key: 'fiduciaryAgentName', label: 'Administrador (Nome Simplificado)' },
  { key: 'classTypeName', label: 'Nível de Subordinação' },
  { key: 'regimeTypeName', label: 'Tipo de Regime' },
  // Linha 2
  { key: 'issuerCorporationName', label: 'Fundo (Razão Social)' },
  { key: 'fiduciaryAgentName', label: 'Administrador (Razão Social)' },
  { key: 'issueNumber', label: 'Emissão' },
  { key: 'b3EventAttendedIndicator', label: 'Eventos Cursados pela B3?' },
  // Linha 3
  { key: 'issuerCorporationName', label: 'Fundo (Conta)' },
  { key: 'fiduciaryAgentName', label: 'Administrador (Conta)' },
  { key: 'seriesIdentificationCode', label: 'Série' },
  { key: 'otcAccountBookkeeperShortName', label: 'Resp. pelo Lançamento Depósito/Retirada' },
  // Linha 4
  { key: 'issuerDocumentNumber', label: 'CNPJ do Fundo' },
  { key: 'otcAccountBookkeeperShortName', label: 'Gestor (Nome Simplificado)' },
  { key: 'isinCode', label: 'Código ISIN' },
  { key: 'instrumentStatusDescription', label: 'Situação' },
  // Linha 5
  { key: 'tickerSymbolTypeCode', label: 'Tipo Fundo' },
  { key: 'fiduciaryAgentName', label: 'Gestor (Nome/Razão Social)' },
  { key: 'seriesIdentificationCode', label: 'Código ANBIMA' },
  { key: 'nonPaymentIndicator', label: 'Inadimplente' },
  // Linha 6
  { key: 'tickerSymbol', label: 'Código do Ativo' },
  { key: 'fiduciaryAgentName', label: 'Gestor (Conta)' },
  { key: 'classTypeName', label: 'Nome da Subclasse' },
  { key: 'instrumentStatusDescription', label: 'Motivo do Status' },
  // Linha 7
  { key: 'tickerSymbolSurname', label: 'Apelido', editable: true },
  { key: 'issuerDocumentNumber', label: 'Gestor (CPF/ CNPJ)' },
  { key: 'seriesIdentificationCode', label: 'Código CVM da Subclasse' },
  { key: 'classTypeName', label: 'Descrição do Fundo' },
  // Linha 8
  { key: 'regimeTypeName', label: 'Tipo de Regime' },
  { key: 'otcAccountBookkeeperShortName', label: 'Escriturador (Nome Simplificado)' },
  { key: 'law12431SupportRuleCode', label: 'Destinação do Recurso (Lei 12.431)' },
  { key: 'issueTypeName', label: 'Tipo de Distribuição' },
  // Linha 9
  { key: 'tickerSymbolTypeCode', label: 'Tipo de Instrumento Financeiro' },
  { key: 'issuerCorporationName', label: 'Escriturador (Razão Social)' },
  { key: 'law12431SupportIndicator', label: 'Artigo Lei 12.431' },
  { key: 'offerRitual', label: 'Rito da Oferta' },
  // Linha 10
  { key: 'curveCalculationIndicator', label: 'Especificação Automática de Cotas' },
  { key: 'issuerCorporationName', label: 'Escriturador (Conta)' },
  { key: 'tradingAdimittedInd', label: 'Cotas Negociáveis Mercado Secundário' },
  { key: 'emissionRestrictedWorkIndicator', label: 'Esforço Restrito' },
  // Linha 11
  { key: 'issueDate', label: 'Data de Emissão' },
  { key: 'otcAccountBookkeeperShortName', label: 'Custodiante (Nome Simplificado)' },
  { key: 'curveCalculationIndicator', label: 'Fundo Exclusivo' },
  { key: 'issueTypeName', label: 'Público da oferta' },
  // Linha 12
  { key: 'maturityDate', label: 'Data de Vencimento' },
  { key: 'issuerCorporationName', label: 'Custodiante (Razão Social)' },
  { key: 'nominalUnitValue', label: 'Custo de Custódia' },
  { key: 'subscriptionPaymentIndicator', label: 'Admite Subscrição Sem a Integralização?' },
];

/**
 * Campos da seção "Dados do Título Sustentável" para CFF
 */
const CFF_TITULO_SUSTENTAVEL_FIELDS: DetailField[] = [
  { key: 'tickerSustainable', label: 'Título Sustentável' },
  { key: 'fiduciaryAgentName', label: 'Certificado por' },
  { key: 'updateLastDate', label: 'Data de Verificação' },
  { key: 'classTypeName', label: 'Padrão' },
];

/**
 * Campos da seção "Negociação de Valores Mobiliários" para CFF
 */
const CFF_NEGOCIACAO_FIELDS: DetailField[] = [
  { key: 'tradingAdimittedInd', label: 'Admitido à negociação' },
  { key: 'negociationStatus', label: 'Status de Negociação' },
  { key: 'blockingReason', label: 'Motivo do bloqueio/restrição' },
];

/**
 * Campos comuns para CBIO
 * Ordenados por linha (da esquerda para direita, de cima para baixo)
 * Layout: 4 colunas
 */
const CBIO_ATIVO_FIELDS: DetailField[] = [
  // Linha 1
  { key: 'tickerSymbol', label: 'Código IF' },
  { key: 'issuerCorporationName', label: 'Registrador (Conta)' },
  { key: 'maturityDate', label: 'Data de Resgate' },
  { key: 'seriesIdentificationCode', label: 'Código Nota ANP' },
  // Linha 2
  { key: 'tickerSymbolSurname', label: 'Apelido', editable: true },
  { key: 'issueQuantity', label: 'Quantidade Emitida' },
  { key: 'updateLastDate', label: 'Data de Registro' },
  { key: 'classTypeName', label: 'Descrição Adicional' },
  // Linha 3
  { key: 'issueDate', label: 'Data de Emissão' },
  { key: 'redemptionQuantity', label: 'Quantidade Aposentada' },
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
        { key: 'tickerSymbol', label: 'Código do Ativo' },
        { key: 'tickerSymbolSurname', label: 'Apelido' },
        { key: 'issueDate', label: 'Data de Emissão' },
        { key: 'maturityDate', label: 'Data de Vencimento' },
        { key: 'issuerCorporationName', label: 'Emissor (Razão Social)' },
        { key: 'instrumentStatusDescription', label: 'Status' },
        { key: 'isinCode', label: 'ISIN' },
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
