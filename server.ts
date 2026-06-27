import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const resolvedFilename = typeof __filename !== "undefined" ? __filename : fileURLToPath(import.meta.url);
const resolvedDirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(resolvedFilename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy initialization of Gemini SDK with User-Agent for telemetry
let aiInstance: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not configured in environment variables.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey || "placeholder-key-to-prevent-crash",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// Helper for generating with a specific prompt & schema
async function callGemini(prompt: string, schema: any, systemInstruction?: string) {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are an elite, venture-capital standard startup coach, co-founder, and expert analyst. Generate highly tailored, deep, and realistic insights with zero generic fluff.",
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.2,
      }
    });

    if (!response.text) {
      throw new Error("No response text from Gemini");
    }

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini call error:", error);
    throw error;
  }
}

// ----------------------------------------------------
// JSON SCHEMAS FOR GEMINI
// ----------------------------------------------------

const ideaValidationSchema = {
  type: Type.OBJECT,
  properties: {
    feasibilityAnalysis: { type: Type.STRING },
    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
    weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
    opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
    risks: { type: Type.ARRAY, items: { type: Type.STRING } },
    validationScore: { type: Type.INTEGER },
    marketDemandScore: { type: Type.INTEGER },
    successProbability: { type: Type.INTEGER },
    opportunityScore: { type: Type.INTEGER },
    recommendedNextSteps: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: [
    "feasibilityAnalysis", "strengths", "weaknesses", "opportunities", "risks",
    "validationScore", "marketDemandScore", "successProbability", "opportunityScore", "recommendedNextSteps"
  ]
};

const competitorAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    competitors: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["Direct", "Indirect", "Emerging"] },
          features: { type: Type.ARRAY, items: { type: Type.STRING } },
          pricing: { type: Type.STRING },
          strength: { type: Type.STRING },
          weakness: { type: Type.STRING }
        },
        required: ["name", "type", "features", "pricing", "strength", "weakness"]
      }
    },
    swot: {
      type: Type.OBJECT,
      properties: {
        strengths: { type: Type.STRING },
        weaknesses: { type: Type.STRING },
        opportunities: { type: Type.STRING },
        threats: { type: Type.STRING }
      },
      required: ["strengths", "weaknesses", "opportunities", "threats"]
    },
    gapAnalysis: { type: Type.STRING },
    positioning: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          innovation: { type: Type.INTEGER },
          marketShare: { type: Type.INTEGER }
        },
        required: ["name", "innovation", "marketShare"]
      }
    }
  },
  required: ["competitors", "swot", "gapAnalysis", "positioning"]
};

const marketResearchSchema = {
  type: Type.OBJECT,
  properties: {
    tam: { type: Type.NUMBER },
    sam: { type: Type.NUMBER },
    som: { type: Type.NUMBER },
    tamExplanation: { type: Type.STRING },
    samExplanation: { type: Type.STRING },
    somExplanation: { type: Type.STRING },
    industryTrends: { type: Type.ARRAY, items: { type: Type.STRING } },
    marketGrowth: { type: Type.STRING },
    customerPersonas: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          role: { type: Type.STRING },
          painPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
          gains: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["name", "role", "painPoints", "gains"]
      }
    },
    userPainPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
    futureOpportunities: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["tam", "sam", "som", "tamExplanation", "samExplanation", "somExplanation", "industryTrends", "marketGrowth", "customerPersonas", "userPainPoints", "futureOpportunities"]
};

const revenueModelSchema = {
  type: Type.OBJECT,
  properties: {
    suggestedModels: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          modelName: { type: Type.STRING },
          pros: { type: Type.ARRAY, items: { type: Type.STRING } },
          cons: { type: Type.ARRAY, items: { type: Type.STRING } },
          revenuePotential: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
          pricingStrategy: { type: Type.STRING },
          monetizationRoadmap: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["modelName", "pros", "cons", "revenuePotential", "pricingStrategy", "monetizationRoadmap"]
      }
    },
    pricingSimulatorConfig: {
      type: Type.OBJECT,
      properties: {
        basePrice: { type: Type.NUMBER },
        growthFactor: { type: Type.NUMBER }
      },
      required: ["basePrice", "growthFactor"]
    }
  },
  required: ["suggestedModels", "pricingSimulatorConfig"]
};

const scorecardSchema = {
  type: Type.OBJECT,
  properties: {
    innovation: { type: Type.INTEGER },
    scalability: { type: Type.INTEGER },
    demand: { type: Type.INTEGER },
    competition: { type: Type.INTEGER },
    profitability: { type: Type.INTEGER },
    investmentPotential: { type: Type.INTEGER },
    overallScore: { type: Type.INTEGER },
    dnaAnalysis: {
      type: Type.OBJECT,
      properties: {
        innovationDNA: { type: Type.STRING },
        marketDNA: { type: Type.STRING },
        founderDNA: { type: Type.STRING },
        productDNA: { type: Type.STRING }
      },
      required: ["innovationDNA", "marketDNA", "founderDNA", "productDNA"]
    }
  },
  required: ["innovation", "scalability", "demand", "competition", "profitability", "investmentPotential", "overallScore", "dnaAnalysis"]
};

const businessPlanSchema = {
  type: Type.OBJECT,
  properties: {
    executiveSummary: { type: Type.STRING },
    companyOverview: { type: Type.STRING },
    missionStatement: { type: Type.STRING },
    visionStatement: { type: Type.STRING },
    productOverview: { type: Type.STRING },
    marketAnalysis: { type: Type.STRING },
    customerSegments: { type: Type.ARRAY, items: { type: Type.STRING } },
    marketingStrategy: { type: Type.STRING },
    salesStrategy: { type: Type.STRING },
    operationalPlan: { type: Type.STRING },
    financialPlan: { type: Type.STRING },
    growthStrategy: { type: Type.STRING },
    riskAnalysis: { type: Type.STRING }
  },
  required: [
    "executiveSummary", "companyOverview", "missionStatement", "visionStatement",
    "productOverview", "marketAnalysis", "customerSegments", "marketingStrategy",
    "salesStrategy", "operationalPlan", "financialPlan", "growthStrategy", "riskAnalysis"
  ]
};

const pitchDeckSchema = {
  type: Type.OBJECT,
  properties: {
    slides: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          number: { type: Type.INTEGER },
          title: { type: Type.STRING },
          subtitle: { type: Type.STRING },
          bulletPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
          designSuggestion: { type: Type.STRING },
          type: { type: Type.STRING }
        },
        required: ["number", "title", "subtitle", "bulletPoints", "designSuggestion", "type"]
      }
    }
  },
  required: ["slides"]
};

const roadmapSchema = {
  type: Type.OBJECT,
  properties: {
    plan30Days: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          kpis: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "description", "kpis"]
      }
    },
    plan90Days: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          kpis: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "description", "kpis"]
      }
    },
    plan6Months: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          kpis: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "description", "kpis"]
      }
    },
    plan1Year: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          kpis: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "description", "kpis"]
      }
    }
  },
  required: ["plan30Days", "plan90Days", "plan6Months", "plan1Year"]
};

const investorDiscoverySchema = {
  type: Type.OBJECT,
  properties: {
    investors: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["Angel", "Venture Capital", "Accelerator", "Incubator"] },
          focusAreas: { type: Type.ARRAY, items: { type: Type.STRING } },
          fundingStage: { type: Type.STRING },
          range: { type: Type.STRING }
        },
        required: ["name", "type", "focusAreas", "fundingStage", "range"]
      }
    }
  },
  required: ["investors"]
};

const leanCanvasSchema = {
  type: Type.OBJECT,
  properties: {
    problem: { type: Type.ARRAY, items: { type: Type.STRING } },
    solution: { type: Type.ARRAY, items: { type: Type.STRING } },
    keyMetrics: { type: Type.ARRAY, items: { type: Type.STRING } },
    uniqueValueProposition: { type: Type.STRING },
    customerSegments: { type: Type.ARRAY, items: { type: Type.STRING } },
    channels: { type: Type.ARRAY, items: { type: Type.STRING } },
    revenueStreams: { type: Type.ARRAY, items: { type: Type.STRING } },
    costStructure: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["problem", "solution", "keyMetrics", "uniqueValueProposition", "customerSegments", "channels", "revenueStreams", "costStructure"]
};

const unicornPredictorSchema = {
  type: Type.OBJECT,
  properties: {
    growthPotential: { type: Type.STRING },
    marketDominance: { type: Type.STRING },
    fundingPotential: { type: Type.STRING },
    unicornScore: { type: Type.INTEGER },
    confidenceLevel: { type: Type.INTEGER },
    recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["growthPotential", "marketDominance", "fundingPotential", "unicornScore", "confidenceLevel", "recommendations"]
};

const nameGeneratorSchema = {
  type: Type.OBJECT,
  properties: {
    suggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          domain: { type: Type.STRING },
          tagline: { type: Type.STRING }
        },
        required: ["name", "domain", "tagline"]
      }
    }
  },
  required: ["suggestions"]
};

const mentorResponseSchema = {
  type: Type.OBJECT,
  properties: {
    response: { type: Type.STRING },
    suggestedPrompts: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["response", "suggestedPrompts"]
};

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

app.post("/api/copilot/generate", async (req, res) => {
  const { type, startup } = req.body;

  if (!startup) {
    return res.status(400).json({ error: "Missing startup information" });
  }

  const { name, description, industry, targetAudience, problemStatement, region } = startup;

  const contextPrompt = `
  Analyze the following startup concept:
  - Startup Name: ${name || "Unnamed Concept"}
  - Description: ${description}
  - Industry: ${industry || "General"}
  - Target Audience: ${targetAudience || "Mass market"}
  - Problem Statement: ${problemStatement || "General pain point"}
  - Geographic Region: ${region || "Global"}
  `;

  try {
    let prompt = "";
    let schema: any = {};
    let systemInstruction = "You are an elite, venture-capital standard startup coach, co-founder, and expert analyst. Generate highly tailored, deep, and realistic insights with zero generic fluff.";

    switch (type) {
      case "idea-validation":
        prompt = `${contextPrompt}\nProvide a full feasibility and SWOT validation scorecard. Calculate precise ratings (0-100) and actionable lists. Ensure validationScore represents an objective assessment of viability.`;
        schema = ideaValidationSchema;
        break;

      case "competitor-analysis":
        prompt = `${contextPrompt}\nIdentify 4 major real or realistic competitors (Direct, Indirect, and Emerging), specify features, pricing structures, distinct strengths & weaknesses, a positioning coordinate graph (X: Innovation, Y: Market Share), gap analysis, and SWOT.`;
        schema = competitorAnalysisSchema;
        break;

      case "market-research":
        prompt = `${contextPrompt}\nPerform comprehensive market sizing (TAM, SAM, SOM in USD Millions), with realistic market dynamics, customer personas, detailed user pain points, and emerging opportunities.`;
        schema = marketResearchSchema;
        break;

      case "revenue-model":
        prompt = `${contextPrompt}\nSuggest 3 premium monetization strategies (SaaS, Transaction, etc.) detailed with pricing strategies, monetization roadmap, and pros/cons. Provide a simulator pricing growth coefficient.`;
        schema = revenueModelSchema;
        break;

      case "scorecard":
        prompt = `${contextPrompt}\nEvaluate this startup across 6 dimensions: Innovation, Scalability, Demand, Competition, Profitability, and Investment Potential. Also generate an overall score and DNA fingerprint analysis.`;
        schema = scorecardSchema;
        break;

      case "business-plan":
        prompt = `${contextPrompt}\nGenerate an investor-grade, deep business plan covering Executive Summary, Mission, Vision, Customer Segments, Marketing, Sales, Operations, Financial Projections, and Risks.`;
        schema = businessPlanSchema;
        break;

      case "pitch-deck":
        prompt = `${contextPrompt}\nDraft a 12-slide high-fidelity presentation pitch deck with specific titles, visual slide outlines, bullets, and Apple-Vision-Pro-level design suggestions.`;
        schema = pitchDeckSchema;
        break;

      case "roadmap":
        prompt = `${contextPrompt}\nProduce a chronological execution roadmap containing exact milestones, KPIs, and deliverables for 30 Days, 90 Days, 6 Months, and 1 Year.`;
        schema = roadmapSchema;
        break;

      case "investor-discovery":
        prompt = `${contextPrompt}\nRecommend 4 real or highly realistic investor matches (VCs, Accelerators, Angels) detailing investment ranges, match stage, and focus areas.`;
        schema = investorDiscoverySchema;
        break;

      case "lean-canvas":
        prompt = `${contextPrompt}\nGenerate a complete structured Lean Canvas representing the core blocks: Problem, Solution, Key Metrics, UVP, Customer Segments, Channels, Revenue, and Cost.`;
        schema = leanCanvasSchema;
        break;

      case "unicorn-predictor":
        prompt = `${contextPrompt}\nAssess the absolute unicorn scale probability, listing confidence metrics, Strategic high-level recommendation roadmaps, and growth potential barriers.`;
        schema = unicornPredictorSchema;
        break;

      case "name-generator":
        prompt = `Generate 5 elite, creative, high-impact startup brand names, domains, and epic taglines based on:
        Industry: ${industry}
        Core Concept: ${description}
        Target Audience: ${targetAudience}
        Problem: ${problemStatement}
        Region: ${region}`;
        schema = nameGeneratorSchema;
        break;

      default:
        return res.status(400).json({ error: `Unsupported analysis type: ${type}` });
    }

    const result = await callGemini(prompt, schema, systemInstruction);
    res.json(result);
  } catch (error: any) {
    console.error(`Error in /api/copilot/generate (${type}):`, error);
    res.status(500).json({ error: "Failed to generate AI analysis", details: error.message });
  }
});

app.post("/api/copilot/mentor", async (req, res) => {
  const { messages, startup } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required" });
  }

  // Get the last user message
  const userMessage = messages[messages.length - 1]?.text || "Hello";

  const contextPrompt = startup 
    ? `The founder is running a startup called "${startup.name}" in the "${startup.industry}" industry.
       Description: ${startup.description}
       Problem: ${startup.problemStatement}
       Geographic Region: ${startup.region}`
    : `No specific startup concept loaded yet. Coach them to formulate an incredible idea.`;

  const mentorSystemPrompt = `
  You are 'JARVIS-Copilot', the world's most elite startup co-founder and investment partner.
  You are speaking to a brilliant founder. Provide extremely practical, sharp, strategic, and high-impact guidance.
  Keep your answers highly structured, formatting with paragraphs, bold terms, and lists.
  Ensure your tone is futuristic, luxurious, extremely sharp, encouraging, and master-level.
  Always return your output as a JSON matching the requested schema.
  `;

  const userPrompt = `
  Context: ${contextPrompt}
  Conversation history count: ${messages.length - 1} messages.
  Founder's message: "${userMessage}"

  Provide your response and 3 dynamic, premium suggested follow-up prompts the founder can click on next.
  `;

  try {
    const result = await callGemini(userPrompt, mentorResponseSchema, mentorSystemPrompt);
    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/copilot/mentor:", error);
    res.status(500).json({ error: "Mentor failed to synthesize response", details: error.message });
  }
});

// ----------------------------------------------------
// VITE OR STATIC STATIC SERVING
// ----------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static files served from dist");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
