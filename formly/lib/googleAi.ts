// googleAI.ts

import { GoogleGenAI } from '@google/genai';

// Initialize the API client
const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});

// Optional config — set to return plain text
const config = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

// Choose the Gemini model
const model = 'gemini-2.0-flash';

// Export the startChat function that returns a full text response
export async function startChat(inputText: string): Promise<string> {
  const contents = [
    {
      role: 'user',
      parts: [{ text: inputText }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullText = '';
  for await (const chunk of response) {
    fullText += chunk.text;
  }

  return fullText;
}
