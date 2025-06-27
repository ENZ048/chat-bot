const Chatbot = require("../models/Chatbot");

exports.createChatbot = async (req, res) => {
  try {
    const { clientId, name, purpose } = req.body;
    const chatbot = new Chatbot({ clientId, name, purpose });
    await chatbot.save();
    res.status(201).json(chatbot);
  } catch (err) {
    res.status(500).json({ message: "Error creating chatbot" });
  }
};

exports.getChatbotsByClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const chatbots = await Chatbot.find({ clientId });
    res.json(chatbots);
  } catch (err) {
    res.status(500).json({ message: "Error fetching chatbots" });
  }
};
