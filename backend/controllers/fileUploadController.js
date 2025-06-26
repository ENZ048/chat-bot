const ChatbotData = require("../models/ChatbotData");

exports.uploadTxtFile = async (req, res) => {
  try {
    const { chatbotId } = req.params;

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const rawText = req.file.buffer.toString("utf-8");

    const entry = new ChatbotData({
      chatbotId,
      rawText,
      source: "manual-upload",
    });

    await entry.save();

    res.status(201).json({ message: "Text file uploaded and saved", dataId: entry._id });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ message: "File upload failed" });
  }
};
