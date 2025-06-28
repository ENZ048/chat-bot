// routes/chatbotRoute.js
const express = require("express");
const router = express.Router();
const Chatbot = require("../models/Chatbot");
const Client = require("../models/Client");
const { createChatbot, getChatbotByClientId } = require("../controllers/chatbotController");

router.post("/create/:clientId", async (req, res) => {
  try {
    const { clientId } = req.params;

    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ message: "Client not found" });

    if (client.chatbot) return res.status(400).json({ message: "Chatbot already exists" });

    const newChatbot = new Chatbot({
      name: `${client.name}'s Chatbot`,
      clientId: clientId,
      dataText: "", // default
    });

    await newChatbot.save();
    client.chatbot = newChatbot._id;
    await client.save();

    res.json(newChatbot);
  } catch (err) {
    console.error("Create chatbot error:", err);
    res.status(500).json({ message: "Chatbot creation failed" });
  }
});


router.get("/client/:clientId", getChatbotByClientId);
module.exports = router;
