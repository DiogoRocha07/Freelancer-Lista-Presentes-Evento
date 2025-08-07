import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Tentar buscar dados da tabela para verificar se existe
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .limit(1);

    if (error) {
      console.error("Erro ao verificar tabela:", error);
      return res.status(500).json({ 
        error: "Erro ao verificar tabela", 
        details: error.message,
        code: error.code 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: "Tabela users existe",
      data: data || []
    });
  } catch (error) {
    console.error("Erro interno:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
} 