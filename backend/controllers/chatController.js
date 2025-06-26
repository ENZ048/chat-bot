const ChatbotData = require("../models/ChatbotData");
const Chatbot = require("../models/Chatbot");
const OpenAI = require("openai");
require("dotenv").config();

require("dotenv").config(); 

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.chatWithBot = async (req, res) => {
  const { chatbotId } = req.params;
  const { message } = req.body;

  try {
    // Get chatbot
    const chatbot = await Chatbot.findById(chatbotId);
    if (!chatbot) return res.status(404).json({ message: "Chatbot not found" });

    // Get chatbot data
    const data = await ChatbotData.findOne({ chatbotId });
    const context = data?.rawText || "No context available for this chatbot.";

    const completion = await openai.chat.completions.create({
      model: chatbot.openaiModel || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant. Use the following context to answer user questions:\n\n${context}`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content || "No response from AI.";
    res.json({ reply });

  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
