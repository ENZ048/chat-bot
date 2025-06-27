const express = require("express");
const router = express.Router();
const { createChatbot, getChatbotsByClient } = require("../controllers/chatbotController");

router.post("/", createChatbot);
router.get("/client/:clientId", getChatbotsByClient);

module.exports = router;
