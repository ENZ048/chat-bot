const Chatbot = require("../models/Chatbot");

exports.createChatbot = async (req, res) => {
  try {
    const { name, clientId, widgetSettings } = req.body;
    const chatbot = new Chatbot({
      name,
      clientId,
      widgetSettings,
    });
    await chatbot.save();
    res.status(201).json(chatbot);
  } catch (err) {
    res.status(500).json({ message: "Failed to create chatbot" });
  }
};

exports.getClientChatbots = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const chatbots = await Chatbot.find({ clientId });
    res.json(chatbots);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch chatbots" });
  }
};
