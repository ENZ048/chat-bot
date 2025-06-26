const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { chatWithBot } = require("../controllers/chatController");

router.post("/:chatbotId", auth, chatWithBot);

module.exports = router;
