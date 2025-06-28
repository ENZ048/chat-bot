const Chatbot = require("../models/Chatbot");
const Client = require("../models/Client"); // ⬅️ make sure this is imported

exports.createChatbot = async (req, res) => {
  try {
    const { name, purpose } = req.body;
    const { clientId } = req.params; // ✅ from URL param

    const chatbot = new Chatbot({ clientId, name, purpose });
    await chatbot.save();

    await Client.findByIdAndUpdate(clientId, { chatbot: chatbot._id }); // ✅ link back

    res.status(201).json(chatbot);
  } catch (err) {
    console.error("Error creating chatbot:", err);
    res.status(500).json({ message: "Error creating chatbot" });
  }
};


exports.getChatbotByClientId = async (req, res) => {
  try {
    const { clientId } = req.params;
    const chatbot = await Chatbot.findOne({ clientId });

    if (!chatbot) {
      return res.status(404).json({ message: "Chatbot not found for this client" });
    }

    res.json(chatbot);
  } catch (err) {
    console.error("Error fetching chatbot:", err);
    res.status(500).json({ message: "Server error" });
  }
};
