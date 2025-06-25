
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { type Employee, type RetentionStrategy, type AppSettings } from '../types';
import { GEMINI_MODEL_NAME, DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY } from '../constants';

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.warn("API_KEY environment variable not found. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "MISSING_API_KEY" });

const getAppSettings = (): AppSettings => {
  try {
    const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (storedSettings) {
      return JSON.parse(storedSettings);
    }
  } catch (error) {
    console.error("Failed to parse settings from localStorage for Gemini service:", error);
  }
  return DEFAULT_SETTINGS;
};


const parseGeneratedStrategies = (text: string): RetentionStrategy[] => {
  const strategies: RetentionStrategy[] = [];
  const lines = text.split('\n');
  let currentTitle = "";
  let currentDescription = "";

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.match(/^Strategy \d+:/i) || trimmedLine.match(/^\d+\. /)) {
      if (currentTitle && currentDescription) {
        strategies.push({ title: currentTitle.replace(/^Strategy \d+:\s*/i, '').replace(/^\d+\.\s*/, ''), description: currentDescription.trim() });
      }
      currentTitle = trimmedLine;
      currentDescription = "";
    } else if (trimmedLine.startsWith("Title:")) {
        if (currentTitle && currentDescription) {
             strategies.push({ title: currentTitle, description: currentDescription.trim() });
        }
        currentTitle = trimmedLine.substring("Title:".length).trim();
        currentDescription = "";
    } else if (trimmedLine.startsWith("Description:")) {
        currentDescription += trimmedLine.substring("Description:".length).trim() + "\n";
    }
    else if (currentTitle) { 
      currentDescription += trimmedLine + "\n";
    }
  }
  if (currentTitle && currentDescription) {
     strategies.push({ title: currentTitle.replace(/^Strategy \d+:\s*/i, '').replace(/^\d+\.\s*/, ''), description: currentDescription.trim() });
  }
  
  if (strategies.length < 2 && text.length > 50) { 
    const blocks = text.split(/\n\s*\n/); 
    if (blocks.length >= 1) {
        return blocks.map((block, index) => {
            const parts = block.split('\n');
            const title = parts[0] || `Strategy ${index + 1}`;
            const description = parts.slice(1).join('\n') || "Details not provided.";
            return { title, description };
        }).filter(s => s.title && s.description);
    }
  }
  
  if (strategies.length === 0 && text.trim().length > 0) {
    return [{ title: "General Retention Advice", description: text.trim() }];
  }

  return strategies;
};


export const geminiService = {
  generateRetentionStrategies: async (employee: Employee): Promise<RetentionStrategy[]> => {
    const appSettings = getAppSettings();
    const delay = appSettings.mockApiDelay;

    if (!apiKey) {
      console.warn(`API_KEY not set. Using mock strategies with a delay of ${delay}ms.`);
      return new Promise(resolve => setTimeout(() => resolve([
        { title: "Mock: Enhance Skill Development", description: `Offer advanced training in areas like Cloud Technologies or AI to align with ${employee.name.split(' ')[0]}'s career aspirations and increase engagement.` },
        { title: "Mock: Improve Work-Life Balance", description: `Review workload distribution for ${employee.name.split(' ')[0]} and explore flexible work arrangements to mitigate burnout risks.` },
        { title: "Mock: Compensation Review", description: `Conduct a market analysis for ${employee.name.split(' ')[0]}'s role and experience, and consider a salary adjustment or performance-based bonus.` }
      ].map(s => ({...s, description: s.description.replace(/\$\{employee\.name\}/g, employee.name)})) // Simple template replacement
      ), delay));
    }

    const prompt = `
      You are an expert HR strategist. An employee, ${employee.name}, a ${employee.role} in the ${employee.department} department, 
      is at ${employee.riskLevel} risk of attrition with a risk score of ${employee.riskScore}/100.

      Key employee details and concerns:
      - Job Satisfaction: ${employee.jobSatisfaction}
      - Compensation Concerns: ${employee.compensationConcern}
      - Work-Life Balance Issues: ${employee.workLifeBalanceIssue}
      - Career Growth Prospects: ${employee.careerGrowthConcern}
      - Relationship with Manager: ${employee.managerRelationship}
      - Performance Rating: ${employee.performanceRating}/5
      - Engagement Score: ${employee.engagementScore}/100
      - Years at Company: ${employee.yearsAtCompany}

      Based on this information, provide 3 distinct, actionable, and personalized retention strategies for this employee.
      For each strategy, provide a clear title and a concise description (2-3 sentences).
      Format each strategy like this:
      Title: [Strategy Title]
      Description: [Strategy Description]
      
      Ensure the strategies are practical and tailored to the concerns highlighted.
    `;

    try {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_MODEL_NAME,
        contents: [{ role: "user", parts: [{text: prompt}] }],
        config: {
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
        }
      });
      
      const generatedText = response.text;
      if (!generatedText) {
        throw new Error("No text returned from Gemini API.");
      }
      return parseGeneratedStrategies(generatedText);

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const specificError = (error instanceof Error && error.message) ? error.message : "Unknown error communicating with AI.";
      if (specificError.includes("API key not valid")) {
        throw new Error("API key not valid. Please check your configuration. (geminiService)");
      }
      throw new Error(`AI service error: ${specificError}`);
    }
  },
};
