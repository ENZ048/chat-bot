const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const clientRoutes = require("./routes/clientRoutes");
app.use("/api/clients", clientRoutes);

const chatbotRoutes = require("./routes/chatbotRoutes");
app.use("/api/chatbots", chatbotRoutes);

const fileUploadRoutes = require("./routes/fileUploadRoutes");
app.use("/api", fileUploadRoutes);

const chatRoutes = require("./routes/chatRoutes");
app.use("/api/chat", chatRoutes);



app.get("/", (req, res) => {
  res.send("Chatbot backend is running!");
});

module.exports = app;
