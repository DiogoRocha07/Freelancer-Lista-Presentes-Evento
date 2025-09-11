# Nova Paleta de Cores - Site Jenny

## Cores Principais

A paleta de cores foi atualizada para usar tons de marrom, criando uma atmosfera mais quente e acolhedora:

### Cores Base
- **Marrom Claro/Caramelo**: `#91725D` - Cor primária para botões e elementos de destaque
- **Marrom Escuro/Chocolate**: `#6B4F35` - Cor secundária para textos e elementos de foco

### Cores Complementares
- **Marrom Muito Claro**: `#f5f2ef` - Fundo principal das seções
- **Marrom Médio**: `#d4c4b8` - Bordas e elementos neutros
- **Marrom Muito Escuro**: `#4a3d2e` - Textos de destaque e hover states

## Aplicação nos Componentes

### 1. Header
- Fundo: Marrom muito claro (`#f5f2ef`)
- Links: Marrom escuro (`#6B4F35`)
- Hover: Marrom claro (`#91725D`)
- Sombra: Com transparência do marrom escuro

### 2. Hero
- Fundo: Marrom muito claro (`#f5f2ef`)
- Título: Marrom escuro (`#6B4F35`)
- Data: Marrom claro (`#91725D`)

### 3. Presentes
- Fundo: Marrom muito claro (`#f5f2ef`)
- Títulos: Marrom escuro (`#6B4F35`)
- Subtítulos: Marrom claro (`#91725D`)
- Cards: Fundo branco com bordas marrom médio
- Botões: Marrom claro com hover marrom escuro
- Inputs: Bordas marrom médio com foco marrom claro

### 4. Confirmação
- Fundo: Marrom muito claro (`#f5f2ef`)
- Formulário: Fundo marrom claro (`#f5f2ef`) com bordas marrom médio
- Labels: Marrom escuro (`#6B4F35`)
- Inputs: Fundo branco, texto marrom escuro, bordas marrom médio
- Botão: Marrom claro com hover marrom escuro
- Hover states: Fundo branco para contrastar com o fundo marrom claro

### 5. Local
- Fundo: Marrom muito claro (`#f5f2ef`)
- Título: Marrom escuro (`#6B4F35`)
- Subtítulo e endereço: Marrom claro (`#91725D`)
- Container do mapa: Sombra com transparência do marrom escuro

## Variáveis CSS

As cores estão definidas como variáveis CSS no arquivo `globals.css`:

```css
:root {
  --primary-brown: #91725D;
  --secondary-brown: #6B4F35;
  --light-brown: #f5f2ef;
  --medium-brown: #d4c4b8;
  --dark-brown: #4a3d2e;
}
```

## Benefícios da Nova Paleta

1. **Harmonia Visual**: Tons de marrom criam uma atmosfera mais quente e acolhedora
2. **Contraste Adequado**: Mantém boa legibilidade entre texto e fundo
3. **Consistência**: Paleta unificada em todos os componentes
4. **Acessibilidade**: Contraste suficiente para leitura confortável
5. **Elegância**: Tons terrosos transmitem sofisticação e naturalidade

## Responsividade

Todas as cores mantêm sua funcionalidade em dispositivos móveis, com ajustes automáticos de tamanho e espaçamento conforme necessário.
