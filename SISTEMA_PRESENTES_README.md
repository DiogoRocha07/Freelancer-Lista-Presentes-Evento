# Sistema de Confirmação de Presença com Seleção de Presentes

## Funcionalidades

O sistema permite que os convidados:
1. **Confirmem sua presença** no evento
2. **Selecionem um presente** da lista (opcional)
3. **Visualizem presentes esgotados** na lista de presentes

## Estrutura das Tabelas

### Tabela `users`
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  confirm BOOLEAN NOT NULL DEFAULT false,
  count_adult INTEGER NOT NULL DEFAULT 1,
  count_kid INTEGER NOT NULL DEFAULT 0,
  gift_id INTEGER REFERENCES presentes(id), -- NOVO CAMPO
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Tabela `presentes`
```sql
CREATE TABLE presentes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  value DECIMAL(10,2),
  image_url TEXT
);
```

## Fluxo de Funcionamento

### 1. Confirmação de Presença
1. **Usuário preenche o formulário** com dados pessoais
2. **Seleciona um presente** (opcional) da lista dropdown
3. **Envio para API** via POST para `/api/confirmar-presenca`
4. **Validação e inserção** no Supabase
5. **Feedback visual** com mensagem de sucesso/erro

### 2. Lista de Presentes
1. **Carregamento dos presentes** da tabela `presentes`
2. **Verificação de presentes selecionados** na tabela `users`
3. **Exibição visual** dos itens esgotados
4. **Links para compra** dos itens disponíveis

## Arquivos Principais

### 1. Componente de Confirmação
- **Arquivo**: `src/pages/confirmacao/Confirmacao.tsx`
- **Funcionalidades**:
  - Formulário de confirmação
  - Seleção de presentes
  - Validação de campos
  - Feedback visual

### 2. Componente de Presentes
- **Arquivo**: `src/pages/presentes/Presentes.tsx`
- **Funcionalidades**:
  - Lista de presentes
  - Indicador de itens esgotados
  - Links para compra
  - Filtros de ordenação

### 3. API Route
- **Arquivo**: `src/pages/api/confirmar-presenca.ts`
- **Funcionalidades**:
  - Validação de dados
  - Inserção na tabela `users`
  - Tratamento de erros

### 4. Tipos TypeScript
- **Arquivo**: `src/types/confirmacao.ts`
- **Funcionalidades**:
  - Tipagem para formulário
  - Tipagem para dados da API
  - Tipagem para respostas

## Campos do Formulário

### Confirmação de Presença
- **Nome completo** (obrigatório)
- **Email** (obrigatório)
- **Telefone** (obrigatório)
- **Confirmação** (Sim/Não)
- **Quantidade de adultos** (1-10)
- **Quantidade de crianças** (0-10)
- **Presente** (opcional - dropdown)

### Dados Salvos na Tabela `users`
- `name`: Nome do convidado
- `email`: Email do convidado
- `phone`: Telefone do convidado
- `confirm`: Boolean (true/false)
- `count_adult`: Número de adultos
- `count_kid`: Número de crianças
- `gift_id`: ID do presente selecionado (null se não selecionado)

## Estados Visuais

### Lista de Presentes
- **Disponível**: Card normal com botão "Presentear"
- **Esgotado**: Card com opacidade reduzida e label "Esgotado"

### Formulário de Confirmação
- **Loading**: Durante envio dos dados
- **Success**: Mensagem de sucesso
- **Error**: Mensagem de erro
- **Loading Presentes**: Durante carregamento da lista

## Configuração do Supabase

### 1. Executar Scripts SQL
```sql
-- Adicionar campo gift_id na tabela users
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS gift_id INTEGER REFERENCES presentes(id);

-- Criar índice para performance
CREATE INDEX IF NOT EXISTS idx_users_gift_id ON users(gift_id);
```

### 2. Políticas RLS
```sql
-- Permitir inserção de dados
CREATE POLICY "Enable insert for all users" ON users 
FOR INSERT WITH CHECK (true);

-- Permitir leitura para verificar presentes selecionados
CREATE POLICY "Enable read for all users" ON users 
FOR SELECT USING (true);
```

## Testes

### 1. Teste de Confirmação
1. Preencha o formulário com dados válidos
2. Selecione um presente da lista
3. Verifique se os dados são salvos na tabela `users`
4. Verifique se o presente aparece como "Esgotado" na lista

### 2. Teste de Lista de Presentes
1. Acesse a página de presentes
2. Verifique se os itens já selecionados aparecem como "Esgotado"
3. Teste os filtros de ordenação
4. Verifique se os links para compra funcionam

### 3. Teste de Validação
1. Tente enviar o formulário sem campos obrigatórios
2. Verifique as mensagens de erro
3. Teste com dados inválidos

## Melhorias Futuras

1. **Notificações**: Email de confirmação
2. **Dashboard**: Painel para visualizar confirmações
3. **Estatísticas**: Contadores de presentes selecionados
4. **Múltiplos presentes**: Permitir seleção de mais de um presente
5. **Categorias**: Organizar presentes por categoria
6. **Fotos**: Upload de fotos dos presentes comprados 