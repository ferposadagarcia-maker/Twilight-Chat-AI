import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Método no permitido. Debes usar POST'});
    }
    try {
        const { history, systemPrompt } = request.body;

        if(!Array.isArray(history) || !systemPrompt) {
            return response.status(400).json({ error: 'Faltan datos del historial o el propmt del sistema.'});
        }

         const apiKey = process.env.GEMINI_API_KEY;
         if (!apiKey) {
            return response.status(500).json({ error: 'Falta configurar la variable GEMINI_API_KEY.' });
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: systemPrompt,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 400
            }
        });

        const formattedHistory = history.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        const result = await model.generateContent({
            contents: formattedHistory
        });

        const apiResponse = await result.response;
        const text = apiResponse.text();
     
        const replyText = apiResponse.text();
        return response.status(200).json({ reply: replyText});
    
    } catch (error) {
        console.error('Error en el servidor:', error);
        return response.status(500).json({ error: 'Error interno del servidor',
            details: error.message });
    }
}