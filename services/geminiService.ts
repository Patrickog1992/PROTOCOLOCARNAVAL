import { GoogleGenAI } from "@google/genai";

// Helper to validate if API key exists
const getApiKey = () => process.env.API_KEY;

export const generateGenderImage = async (gender: 'HOMEM' | 'MULHER'): Promise<string | null> => {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Using gemini-2.5-flash-image for generation
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Create a realistic high-quality photo of a fitness person full body, ${gender === 'HOMEM' ? 'male' : 'female'}, wearing workout clothes, standing confidently, white background, studio lighting, 8k, photorealistic.`,
          },
        ],
      },
      config: {
        // No responseMimeType for image generation models in this context usually, 
        // but we need to parse the base64 from the response part.
      },
    });

    // Check for inline data
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
           return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;

  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};

export const generateIllustration = async (prompt: string): Promise<string | null> => {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `${prompt}, 3d render, pixar style, high quality, colorful, cute, fitness theme`,
          },
        ],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
           return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;

  } catch (error) {
    console.error("Error generating illustration:", error);
    return null;
  }
};