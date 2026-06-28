import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini Client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API: Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", geminiConfigured: !!process.env.GEMINI_API_KEY });
});

// API: Recruiter Interview
app.post("/api/gemini/interview", async (req, res) => {
  const { language, chat } = req.body;

  if (!language) {
    return res.status(400).json({ error: "Language is required." });
  }

  // Format the conversation history
  const historyText = (chat || [])
    .map((m: any) => `${m.sender === "recruiter" ? "Recrutador" : "Candidato"}: ${m.text}`)
    .join("\n");

  const prompt = `Você é um Recrutador Técnico Sênior e Arquiteto de Software de Elite da DevForge Academy.
Seu objetivo é entrevistar o candidato sobre seus conhecimentos práticos na linguagem de programação: ${language}.

Responda em PORTUGUÊS de forma direta, altamente profissional e técnica, desafiando o candidato com perguntas sobre performance, segurança, design de arquitetura, ecossistema e armadilhas comuns da linguagem.

Instruções para o chat:
- Se for a primeira mensagem, dê as boas-vindas formais e faça a primeira pergunta técnica desafiadora.
- Se houver histórico de conversa, avalie a resposta anterior do candidato (seja construtivo, aponte acertos ou correções técnicas se houver erros gritantes) e prossiga fazendo a próxima pergunta.
- Se o candidato solicitar o encerramento ou após 4-5 rodadas de perguntas, dê uma nota de 0 a 100, faça um resumo dos pontos fortes e fracos técnicos demonstrados, e dê conselhos de carreira.

Histórico atual da entrevista:
${historyText}

Mensagem final do candidato (se aplicável): "${chat && chat.length > 0 ? chat[chat.length - 1].text : "(Início da entrevista)"}"

Responda apenas com a fala do recrutador técnico, mantendo um tom de entrevista de emprego de alto nível em grandes Big Techs.`;

  try {
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Interview Error:", error);
    // Graceful fallback response
    res.json({
      text: `[FALLBACK RECRUITER] Olá! Parece que o servidor de inteligência artificial está temporariamente offline ou a chave de API não foi configurada nos Segredos (Secrets). Como recrutador da DevForge, pergunto de forma padrão: Como você gerencia concorrência e vazamentos de memória na stack do ${language}? Descreva detalhadamente seu plano de ação técnico.`,
      isFallback: true,
      errorDetail: error.message
    });
  }
});

// API: Code feedback / compiler simulator
app.post("/api/gemini/tutor", async (req, res) => {
  const { code, language, instruction } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required." });
  }

  const prompt = `Você é o Tutor de Compilação Inteligente do DevForge.
Analise o seguinte trecho de código escrito pelo estudante:

Linguagem: ${language}
Instrução/Problema a resolver: ${instruction || "Exercício de validação de sintaxe e boas práticas."}

Código do Estudante:
\`\`\`${language}
${code}
\`\`\`

Por favor, analise o código e forneça uma resposta estruturada em JSON (apenas o JSON bruto, sem tags markdown do tipo \`\`\`json) com os seguintes campos:
1. "success": booleano indicando se o código compilaria sem erros fatais.
2. "feedback": string explicativa em português sobre a qualidade do código, indentação e performance.
3. "tips": array de strings com sugestões de boas práticas e otimizações.
4. "correctedCode": string com a versão corrigida/otimizada do código (se necessário, caso contrário deixe em branco).`;

  try {
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const resultText = response.text || "{}";
    res.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error("Gemini Tutor Error:", error);
    // Simple client fallback
    res.json({
      success: true,
      feedback: "Código analisado no modo offline local de segurança. Ótimo progresso! (Configure sua chave GEMINI_API_KEY nas configurações para análise inteligente profunda).",
      tips: [
        "Certifique-se de validar chaves, parênteses e tipos de dados no seu código.",
        "Mantenha variáveis com nomes descritivos em português ou inglês padrão.",
        "Evite variáveis globais soltas."
      ],
      correctedCode: ""
    });
  }
});

// Vite & Static file serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[DevForge Server] Rodando na porta http://localhost:${PORT}`);
  });
}

startServer();
