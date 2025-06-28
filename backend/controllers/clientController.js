const Client = require("../models/Client");

exports.createClient = async (req, res) => {
  try {
    const { name, website, email } = req.body;
    const existing = await Client.findOne({ email });
    if (existing) return res.status(409).json({ message: "Client already exists" });

    const client = new Client({ name, website, email });
    await client.save();

    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ message: "Error creating client" });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().populate("chatbot");
    res.json(clients);
  } catch (err) {
    console.error("Error fetching clients:", err);
    res.status(500).json({ message: "Failed to fetch clients" });
  }
};

