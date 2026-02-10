# Especificações de Design - Cadastro de Clientes

Extraído do Figma: B3 (Cadastro de Clientes - Já validado UX)

---

## 📦 Estrutura Geral

### Layout Principal
- **Dimensões da tela**: 1366 x 768px
- **Background**: `#F8FAFB` (fill_ZZHFML)
- **Header (topo_sinacor)**: 1366 x 50px, cor `#003475`

### Footer
- **Texto**: "Copyright © 2025 SINACOR RENDA FIXA"
- **Fonte**: Mulish, 400, 10px
- **Cor do texto**: `#A5AEBC`

---

## 🎨 Paleta de Cores

### Cores Primárias
| Nome | Hex | Uso |
|------|-----|-----|
| Primário | `#2660F0` | Botões ativos, elementos de destaque |
| Secundário/Dark | `#00295C` | Backgrounds escuros |
| Background | `#F8FAFB` | Fundo principal |
| Card Background | `#F8F9FB` | Fundo de cards/painéis |
| Branco | `#FFFFFF` | Inputs, cards |

### Cores Neutras
| Nome | Hex | Uso |
|------|-----|-----|
| Neutral/900 | `#1D1D1D` | Textos principais |
| Neutral/500 | `#757575` | Textos secundários |
| Texto Label | `#575757` | Labels de formulário |
| Texto Primário | `#003979` | Títulos, links |
| Footer Text | `#A5AEBC` | Texto do rodapé |

### Cores de Notificação
| Nome | Hex | Uso |
|------|-----|-----|
| Sucesso/Dark | `#348941` | Status "Ativo" |
| Erro/Dark | `#E40000` | Status "Inativo", "Bloqueado" |

### Cores de Borda
| Nome | Hex | Uso |
|------|-----|-----|
| Stroke Primary | `#CBD3E1` | Bordas de inputs, cards |
| Stroke Tab | `#E9E9EC` | Bordas de tabs |

---

## 📝 Tipografia

### Família de Fontes
- **Rubik**: Principal (títulos, labels, textos)
- **Mulish**: Secundária (footer)

### Estilos de Texto
| Estilo | Fonte | Peso | Tamanho | Line Height |
|--------|-------|------|---------|-------------|
| texto-l | Rubik | 500 | 16px | 1.185em |
| texto-s | Rubik | 400 | 12px | 1.185em |
| style_TOSN5C | Mulish | 400 | 10px | 1.255em |

---

## 🧩 Componentes

### Tabs (Abas)

#### Tab Normal (não selecionada)
- **Background**: `#F2F3F6`
- **Borda**: `#E9E9EC` (1px top, 1px sides, 0px bottom)
- **Border Radius**: 5px 5px 0px 0px
- **Padding**: 10px 12px
- **Altura**: 35px

#### Tab Selecionada
- **Background**: `#F8F9FB`
- **Borda**: `#E9E9EC` (0px top, 1px sides)
- **Border Radius**: 5px 5px 0px 0px

#### Abas do Sistema de Cadastro
1. Dados Básicos
2. FATCA IRS
3. Pessoa Física
4. **Pessoa Física SFP** ← Alvo
5. Documentos
6. Endereços
7. Telefones
8. E-mails
9. Relacionamentos
10. Contas
11. **Investidor Não Residente** ← Alvo (Pessoa Física Não Residente)

---

### Formulários (snc-form-control)

#### Container do Input
- **Modo**: Column
- **Gap**: 3px
- **Background**: `#FFFFFF`

#### Label
- **Fonte**: Rubik
- **Peso**: 400
- **Tamanho**: 12px
- **Cor**: `#575757`

#### Input (snc-input)
- **Altura**: 35px
- **Background**: `#FFFFFF`
- **Borda**: 1px solid `#CBD3E1`
- **Border Radius**: 5px
- **Padding**: 0px 8px

---

### Botões (snc-button)

#### Botão Primário
```scss
.snc-button-primary {
  height: 35px;
  background: #2660F0;
  border: 1px solid #CBD3E1;
  padding: 0px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
```

#### Botão Secundário/Desabilitado
```scss
.snc-button-disabled {
  background: #EFEFEF;
  border: 1px solid #CBD3E1;
}
```

---

### Breadcrumb
- **Container**: padding 0px 6px 0px 16px
- **Altura**: 38px
- **Gap entre itens**: 9px
- **Posição**: absoluteFrame top: 50px

---

### DataGrid (Tabela de Consulta)

#### Cabeçalho
- **Background**: `#F2F3F6`
- **Altura da linha**: 35px
- **Borda**: 1px solid `#CBD3E1`

#### Linhas
- **Altura**: 35px
- **Linha selecionada**: Borda esquerda 3px `#2660F0`

#### Colunas Típicas
- Nome (cliente)
- Tipo (CPF/CNPJ)
- Documento
- Investidor
- Status
- Data/Hora

---

### Status Chips

#### Ativo
```scss
.status-ativo {
  color: #348941;
  font-size: 12px;
}
```

#### Inativo
```scss
.status-inativo {
  color: #E40000;
  font-size: 12px;
}
```

#### Bloqueado
```scss
.status-bloqueado {
  color: #E40000;
  font-size: 12px;
}
```

---

### Filtro Dinâmico (filtro-dinamico_vs2)

- **Container Expandido**: False por padrão
- **Chips visíveis**: False por padrão
- **Background Base**: `#FFFFFF`
- **Borda**: 1px solid `#CBD3E1`
- **Border Radius**: 5px 0px 0px 5px

---

## 📐 Layout Específico

### Pessoa Física SFP

Esta aba faz parte do formulário de cadastro de clientes com as seguintes características:

#### Estrutura
- Herda o layout padrão de 1366 x 768px
- Conteúdo principal: 1334 x 521px
- Posição do conteúdo: x: 16, y: 203

#### Campos Específicos (baseado no padrão Dados Básicos)
- Campos de identificação pessoal
- Campos de regime fiscal SFP (Simples Pessoa Física)
- Dados bancários específicos

---

### Investidor Não Residente (Pessoa Física Não Residente)

Esta aba contém campos específicos para investidores não residentes:

#### Estrutura
- Tab ID: 4095:22262
- Layout: Row, center aligned
- Padding: 10px 12px
- Border Radius: 5px 5px 0px 0px

#### Campos Específicos
- País de residência fiscal
- Número de identificação fiscal estrangeiro
- Declarações FATCA
- Documentos de comprovação de residência
- Dados do representante legal no Brasil

---

## 🔧 Componentes Compartilhados

### Voltar (voltar_limpo)
- **Dimensões**: 40 x 40px
- Ícone de seta para navegação

### Título da Tela
- **Título Principal**: "Cadastro de Clientes"
  - Fonte: Rubik, 500, 16px
  - Cor: `#003979`
- **Subtítulo**: "Manutenção e Inclusão" ou "Consulta"
  - Fonte: Rubik, 400, 12px
  - Cor: `#575757`

### Rodapé do DataGrid
- Componente de paginação
- Exibição de quantidade de registros

---

## 📱 Responsividade

O design atual é otimizado para desktop (1366px). Para adaptação responsiva:

- **Breakpoints sugeridos**:
  - Desktop: 1366px+
  - Tablet: 768px - 1365px
  - Mobile: < 768px

---

## 🎯 Observações de Implementação

1. **Tabs**: As abas "Pessoa Física SFP" e "Investidor Não Residente" compartilham a mesma estrutura de layout, diferindo apenas nos campos específicos

2. **Estados**: Todos os componentes devem ter estados:
   - Default
   - Hover
   - Disabled
   - Active/Selected

3. **Validação**: Campos obrigatórios devem exibir asterisco (*) no label

4. **Feedback Visual**: Utilizar cores de notificação para feedback de validação

---

*Documento gerado a partir do arquivo Figma B3 - Node ID: 2315:25135*
