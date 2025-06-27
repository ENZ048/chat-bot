const fs = require("fs");
const Chatbot = require("../models/Chatbot");

exports.uploadTxtFile = async (req, res) => {
  try {
    const chatbotId = req.params.chatbotId;
    const fileContent = fs.readFileSync(req.file.path, "utf-8");

    const chatbot = await Chatbot.findByIdAndUpdate(chatbotId, {
      dataText: fileContent
    }, { new: true });

    res.json({ message: "File uploaded and data stored", chatbot });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};
