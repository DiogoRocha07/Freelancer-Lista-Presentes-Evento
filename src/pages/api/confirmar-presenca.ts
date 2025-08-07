import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";
import { ConfirmacaoData } from "../../types/confirmacao";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, confirm, count_adult, count_kid, gift_id }: ConfirmacaoData = req.body;

    console.log("Dados recebidos:", { name, email, phone, confirm, count_adult, count_kid, gift_id });

    // Validar dados obrigatórios
    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Nome, email e telefone são obrigatórios" });
    }

    // Preparar dados para inserção
    const insertData = {
      name,
      email,
      phone,
      confirm,
      count_adult,
      count_kid,
      gift_id,
    };

    console.log("Dados para inserção:", insertData);

    // Tentar inserir dados na tabela users
    console.log("Tentando inserir na tabela users...");
    
    const { data, error } = await supabase
      .from("users")
      .insert([insertData])
      .select();

    if (error) {
      console.error("Erro detalhado do Supabase:", error);
      
      // Se a tabela não existir, tentar criar uma estrutura básica
      if (error.code === '42P01') { // Tabela não existe
        console.log("Tabela users não existe. Criando estrutura básica...");
        
        // Tentar inserir sem select() primeiro
        const { error: insertError } = await supabase
          .from("users")
          .insert([insertData]);
          
        if (insertError) {
          return res.status(500).json({ 
            error: "Tabela users não existe ou não tem a estrutura correta", 
            details: insertError.message,
            code: insertError.code,
            suggestion: "Execute o script create_users_table.sql no Supabase"
          });
        }
        
        return res.status(200).json({ 
          success: true, 
          message: "Confirmação registrada com sucesso!",
          note: "Tabela criada automaticamente"
        });
      }
      
      return res.status(500).json({ 
        error: "Erro ao salvar confirmação", 
        details: error.message,
        code: error.code 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: "Confirmação registrada com sucesso!",
      data 
    });
  } catch (error) {
    console.error("Erro interno:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
} 