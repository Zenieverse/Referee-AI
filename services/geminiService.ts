
import { GoogleGenAI, Type } from "@google/genai";
import { DecisionInputs, RefereeAnalysis } from "../types";

export const getDecisionAnalysis = async (inputs: DecisionInputs): Promise<RefereeAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Decision Question: ${inputs.question}
    Options: ${inputs.options.join(", ")}
    Constraints and Priorities: ${inputs.constraints.map(c => `${c.name} (${c.weight})`).join(", ")}
    Risk Tolerance: ${inputs.riskTolerance}

    Act as 'The Referee', an impartial decision-steering agent. 
    Analyze the options based on the provided priorities and risk tolerance. 
    Provide conditional recommendations and explain trade-offs clearly.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: `
        You are The Referee, an impartial decision-steering agent.
        Your role is to help users navigate complex choices by comparing options and explaining trade-offs — not by giving a single “best” answer.
        You must:
        - Ask clarifying questions if constraints are missing (include in summary if necessary).
        - Compare options using the user’s priorities.
        - Explain trade-offs clearly and honestly.
        - Provide conditional recommendations (“If you value X, choose A”).
        - Avoid absolute conclusions unless explicitly requested.
        - Guardrails: Do not oversimplify, do not recommend based on popularity, do not ignore stated constraints, always explain why.
      `,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "Neutral restatement of the problem and missing info." },
          comparisonTable: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                optionName: { type: Type.STRING },
                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                bestFit: { type: Type.STRING },
                hiddenRisks: { type: Type.STRING }
              },
              required: ["optionName", "strengths", "weaknesses", "bestFit", "hiddenRisks"]
            }
          },
          tradeOffAnalysis: {
            type: Type.OBJECT,
            properties: {
              gainsVsLosses: { type: Type.STRING },
              shortVsLongTerm: { type: Type.STRING }
            },
            required: ["gainsVsLosses", "shortVsLongTerm"]
          },
          verdicts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                condition: { type: Type.STRING, description: "The priority condition (e.g., 'If you value budget')" },
                choice: { type: Type.STRING, description: "The recommended option for that condition" }
              },
              required: ["condition", "choice"]
            }
          },
          confidence: {
            type: Type.OBJECT,
            properties: {
              level: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
              reversalConditions: { type: Type.STRING }
            },
            required: ["level", "reversalConditions"]
          }
        },
        required: ["summary", "comparisonTable", "tradeOffAnalysis", "verdicts", "confidence"]
      }
    },
  });

  return JSON.parse(response.text.trim());
};
