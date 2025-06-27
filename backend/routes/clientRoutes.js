const express = require("express");
const router = express.Router();
const { createClient, getAllClients } = require("../controllers/clientController");
const auth = require("../middleware/authMiddleware");

router.post("/", createClient);   // ✅ create route
router.get("/", getAllClients);

module.exports = router;
