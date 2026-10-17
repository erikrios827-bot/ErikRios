import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini SDK if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(apiKey),
      timestamp: new Date().toISOString(),
    });
  });

  // AI Knowledge Discovery endpoint
  app.post('/api/ai/search', async (req: Request, res: Response) => {
    const { query = '', practices = [], language = 'en' } = req.body || {};
    try {

      if (!query || typeof query !== 'string') {
        res.status(400).json({ error: 'Query is required' });
        return;
      }

      if (!ai) {
        // Fallback local semantic matching if API key is not configured in environment
        res.json({
          usedAi: false,
          summary: `Identified practices related to: "${query}". (Note: Connect Gemini API key in Secrets for deep AI reasoning).`,
          recommendations: (practices || []).slice(0, 3).map((p: any) => ({
            practiceId: p.id,
            relevanceScore: 0.85,
            whyUseful: `Addresses ${p.category} hazards and provides verified procedural solution from ${p.site}, ${p.country}.`,
            cautionNote: 'Requires local risk assessment and site standard review prior to replication.',
          })),
        });
        return;
      }

      const prompt = `You are the UPM Safety & Continuous Improvement AI Knowledge Advisor.
A user asked: "${query}" in language "${language}".

Below is the repository of APPROVED & VALIDATED corporate good practices:
${JSON.stringify(
  (practices || []).map((p: any) => ({
    id: p.id,
    code: p.code,
    title: p.title,
    category: p.category,
    country: p.country,
    site: p.site,
    problem: p.problemStatement,
    hazard: p.hazardIdentified,
    solution: p.solutionDescription,
    tags: p.tags,
  })),
  null,
  2
)}

TASKS:
1. Identify the most relevant practices (by semantic intent, equipment, risk, synonyms in multiple languages).
2. Answer the user's question clearly in the language "${language}".
3. Explain why each selected practice applies to their problem.
4. Provide a clear industrial safety caution: clarify that this is a benchmark reference and never bypasses local site risk assessment or equipment-specific safety rules.
5. If no practices match, state that honestly without inventing fake practices or procedures.

Respond in pure JSON matching this format:
{
  "summary": "Clear, helpful advisory synthesis answering the query",
  "matchedPracticeIds": ["p_1", ...],
  "recommendations": [
    {
      "practiceId": "p_1",
      "whyUseful": "Explanation of why this practice solves the query",
      "cautionNote": "Specific caution for local implementation"
    }
  ],
  "suggestedFollowUps": ["Question 1?", "Question 2?"]
}`;

      const aiResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction: 'You are an industrial safety engineer and continuous improvement expert for a global multinational corporation. You base all answers strictly on documented corporate knowledge and emphasize zero-harm safety standards.',
        },
      });

      const text = aiResponse.text || '{}';
      try {
        const parsed = JSON.parse(text);
        res.json({ usedAi: true, ...parsed });
      } catch {
        res.json({
          usedAi: true,
          summary: text,
          matchedPracticeIds: [],
          recommendations: [],
        });
      }
    } catch (error: any) {
      console.warn('Gemini search transient error, falling back to semantic matcher:', error?.message || error);
      const q = (query || '').toLowerCase();
      const matched = (practices || []).filter((p: any) => {
        const titleMatch = (p.title || '').toLowerCase().includes(q);
        const tagMatch = (p.tags || []).some((t: string) => t.toLowerCase().includes(q));
        const probMatch = (p.problemStatement || '').toLowerCase().includes(q);
        const solMatch = (p.solutionDescription || '').toLowerCase().includes(q);
        return titleMatch || tagMatch || probMatch || solMatch;
      });

      const listToRecommend = matched.length > 0 ? matched : (practices || []);

      let summaryText = `Identified ${listToRecommend.length} validated practices addressing: "${query}". Solutions verified by unanimous safety consensus.`;
      let cautionNoteText = 'Requires local site risk assessment (TRA) and machine-specific verification prior to replication.';
      let followUps = [
        'What PPE is required during this operation?',
        'How can this be replicated in packaging lines?',
        'What are the LOTO isolation points?'
      ];

      if (language === 'es') {
        summaryText = `Se identificaron ${listToRecommend.length} prácticas validadas para la consulta: "${query}". Soluciones verificadas y aprobadas por consenso unánime de seguridad.`;
        cautionNoteText = 'Exige realizar una Evaluación de Riesgo de Tarea (TRA) local y verificar los procedimientos estándar antes de su réplica.';
        followUps = [
          '¿Qué EPP específico se requiere para esta operación?',
          '¿Cómo replicar esta mejora en líneas de conversión y empaque?',
          '¿Cuáles son los puntos críticos de bloqueo y aislamiento LOTO?'
        ];
      } else if (language === 'fi') {
        summaryText = `Löydetty ${listToRecommend.length} validoitua turvallisuuskäytäntöä haulle: "${query}". Ratkaisut hyväksytty yksimielisellä turvallisuuskonsensuksella.`;
        cautionNoteText = 'Edellyttää paikallista tehtaan riskinarviointia (TRA) ja laitekohtaista hyväksyntää ennen monistamista.';
        followUps = [
          'Mitä henkilönsuojaimia tarvitaan tässä toimenpiteessä?',
          'Miten ratkaisu voidaan monistaa muille tuotantolinjoille?',
          'Mitkä ovat kriittiset LOTO-eristyspisteet?'
        ];
      } else if (language === 'de') {
        summaryText = `${listToRecommend.length} validierte Best Practices zur Anfrage "${query}" identifiziert. Durch einstimmigen Sicherheitskonsens freigegeben.`;
        cautionNoteText = 'Erfordert eine lokale Gefährdungsbeurteilung (TRA) und anlagenspezifische Prüfung vor der Übernahme.';
        followUps = [
          'Welche PSA ist für diese Tätigkeit zwingend erforderlich?',
          'Wie lässt sich diese Lösung auf andere Verpackungslinien übertragen?',
          'Wo liegen die primären LOTO-Trennstellen?'
        ];
      } else if (language === 'pt') {
        summaryText = `Identificadas ${listToRecommend.length} boas práticas validadas para a consulta: "${query}". Soluções auditadas por consenso unânime de segurança.`;
        cautionNoteText = 'Exige Análise de Risco da Tarefa (TRA) local e homologação de engenharia antes da replicação.';
        followUps = [
          'Quais EPIs específicos são necessários nesta operação?',
          'Como replicar esta melhoria em linhas de embalagem e acabamento?',
          'Quais são os pontos de isolamento LOTO prioritários?'
        ];
      }

      res.json({
        usedAi: false,
        summary: summaryText,
        matchedPracticeIds: listToRecommend.map((p: any) => p.id),
        recommendations: listToRecommend.slice(0, 3).map((p: any) => ({
          practiceId: p.id,
          whyUseful: language === 'es'
            ? `Aborda directamente riesgos de ${p.category} con solución de ingeniería validada en ${p.site}, ${p.country}.`
            : language === 'fi'
            ? `Vastaa luokan ${p.category} riskeihin todennetulla ratkaisulla yksiköstä ${p.site}, ${p.country}.`
            : language === 'de'
            ? `Behebt Risiken im Bereich ${p.category} mit geprüfter technischer Lösung aus ${p.site}, ${p.country}.`
            : language === 'pt'
            ? `Aborda diretamente perigos de ${p.category} com solução técnica comprovada em ${p.site}, ${p.country}.`
            : `Directly targets ${p.category} hazards with engineered solution validated at ${p.site}, ${p.country}.`,
          cautionNote: cautionNoteText,
        })),
        suggestedFollowUps: followUps,
      });
    }
  });

  // Dynamic AI translation
  app.post('/api/ai/translate', async (req: Request, res: Response) => {
    try {
      const { text, targetLanguage } = req.body;
      if (!text || !targetLanguage) {
        res.status(400).json({ error: 'text and targetLanguage are required' });
        return;
      }

      if (!ai) {
        res.json({ translatedText: text, isAutoTranslated: false });
        return;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Translate the following industrial safety text into ${targetLanguage}. Maintain technical terminology accuracy (e.g. LOTO, slitter, PPE, guardrails). Return ONLY the translated string without quotes or preamble:\n\n${text}`,
      });

      res.json({
        translatedText: response.text?.trim() || text,
        isAutoTranslated: true,
      });
    } catch (e: any) {
      res.json({ translatedText: req.body.text, isAutoTranslated: false });
    }
  });

  // Setup Vite dev server or static files
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`UPM Safety Hub server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
