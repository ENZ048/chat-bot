const Client = require("../models/Client");

exports.createClient = async (req, res) => {
  try {
    const { name, contactInfo } = req.body;
    const client = new Client({
      name,
      contactInfo,
      createdBy: req.user.userId,
    });
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    console.error("Create client error:", err.message);
    res.status(500).json({ message: "Failed to create client" });
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find({ createdBy: req.user.userId });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch clients" });
  }
};
