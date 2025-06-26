const express = require("express");
const router = express.Router();
const { createChatbot, getClientChatbots } = require("../controllers/chatbotController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, createChatbot);
router.get("/:clientId", auth, getClientChatbots);

module.exports = router;
