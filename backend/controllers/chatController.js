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

    const context = chatbot.dataText || "This is a helpful assistant.";

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: `Use the following context to answer: ${context}` },
        { role: "user", content: message }
      ]
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ message: "Chat failed" });
  }
};
