const mongoose = require("mongoose");

const chatbotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  widgetSettings: {
    primaryColor: String,
    logoURL: String,
  },
  openaiModel: { type: String, default: "gpt-3.5-turbo" },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

module.exports = mongoose.model("Chatbot", chatbotSchema);
