const Chatbot = require("../models/Chatbot");
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.askChatbot = async (req, res) => {
  try {
    const { message } = req.body;
    const { chatbotId } = req.params;

    const chatbot = await Chatbot.findById(chatbotId);
    if (!chatbot) return res.status(404).json({ message: "Chatbot not found" });

    const context = chatbot.dataText || "";

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
You are a helpful, friendly customer support chatbot for a business website.

Your goals:
- Respond concisely (2–4 short sentences max)
- Use bullet points or numbered steps when needed
- Make it easy to read and scan
- Avoid saying things like "based on the content provided"
- If unsure, suggest helpful next steps instead of saying "I don't know"

Business info (optional):
${context}
  `.trim(),
        },
        { role: "user", content: message },
      ],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ message: "Chat failed" });
  }
};
