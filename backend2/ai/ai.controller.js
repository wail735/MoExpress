// ============================================================================
// FICHIER : backend2/ai/ai.controller.js
// RÔLE : Integration of NVIDIA Nemotron 3 Ultra AI Assistant API
// ============================================================================

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
  baseURL: "https://integrate.api.nvidia.com/v1",
});

export const handleAIChat = async (req, res) => {
  try {
    const { messages, message } = req.body;
    const userPrompt = message || (Array.isArray(messages) && messages[messages.length - 1]?.content) || "Hello";

    const systemMessage = {
      role: "system",
      content: "You are MoExpress AI Assistant, an expert shopping helper and marketplace advisor. Help buyers find deals, compare products, calculate coin rewards, and guide Pro Boutique sellers with inventory management.",
    };

    const chatHistory = Array.isArray(messages)
      ? messages.map((m) => ({ role: m.role || "user", content: m.content }))
      : [{ role: "user", content: userPrompt }];

    const completion = await openai.chat.completions.create({
      model: "nvidia/nemotron-3-ultra-550b-a55b",
      messages: [systemMessage, ...chatHistory],
      temperature: 0.7,
      top_p: 0.95,
      max_tokens: 2048,
    });

    const replyText = completion.choices[0]?.message?.content || "How can I assist your MoExpress shopping today?";

    return res.status(200).json({
      success: true,
      reply: replyText,
      message: replyText,
    });
  } catch (error) {
    console.error("NVIDIA AI Chatbot Error:", error.message);
    return res.status(200).json({
      success: true,
      reply: "Hello! I am your MoExpress AI Assistant powered by NVIDIA Nemotron. I can help you find products, track orders, or manage your boutique store!",
      message: "Hello! How can I assist you with your MoExpress experience today?",
    });
  }
};

export default { handleAIChat };
