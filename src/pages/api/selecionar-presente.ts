import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";

interface SelecionarPresenteRequest {
  name: string;
  phone: string;
  gift_id: number;
}

interface SelecionarPresenteResponse {
  success: boolean;
  message: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SelecionarPresenteResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ 
      success: false, 
      message: "Method not allowed",
      error: "Method not allowed" 
    });
  }

  try {
    const { name, phone, gift_id }: SelecionarPresenteRequest = req.body;

    console.log("Dados recebidos (selecionar presente):", { name, phone, gift_id });

    // Validar dados obrigatórios
    if (!name || !phone || !gift_id) {
      return res.status(400).json({ 
        success: false, 
        message: "Nome, telefone e ID do presente são obrigatórios",
        error: "Nome, telefone e ID do presente são obrigatórios" 
      });
    }

    // Verificar se o presente já foi selecionado
    const { data: existingSelections, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("gift_id", gift_id)
      .limit(1);

    if (checkError) {
      console.error("Erro ao verificar presente:", checkError);
    }

    if (existingSelections && existingSelections.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Este presente já foi selecionado por outro convidado",
        error: "Este presente já foi selecionado por outro convidado" 
      });
    }

    // Inserir dados na tabela users
    const insertData = {
      name,
      phone,
      gift_id,
      confirm: false, // Por padrão, não está confirmando presença, apenas selecionando presente
      count_adult: 0,
      count_kid: 0,
      email: "", // Vazio quando apenas seleciona presente
    };

    const { data, error } = await supabase
      .from("users")
      .insert([insertData])
      .select();

    if (error) {
      console.error("Erro ao salvar seleção de presente:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Erro ao salvar seleção de presente",
        error: "Erro ao salvar seleção de presente" 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: "Presente selecionado com sucesso!" 
    });
  } catch (error) {
    console.error("Erro interno:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Erro interno do servidor",
      error: "Erro interno do servidor" 
    });
  }
}

