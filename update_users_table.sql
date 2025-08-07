-- Script para adicionar o campo gift_id na tabela users
-- Execute este script no SQL Editor do Supabase

-- Adicionar coluna gift_id como foreign key para a tabela presentes
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS gift_id INTEGER REFERENCES presentes(id);

-- Criar índice para melhor performance nas consultas
CREATE INDEX IF NOT EXISTS idx_users_gift_id ON users(gift_id);

-- Comentário sobre a nova coluna
COMMENT ON COLUMN users.gift_id IS 'ID do presente selecionado pelo convidado (foreign key para tabela presentes)';

-- Verificar se a tabela users tem a estrutura correta
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position; 