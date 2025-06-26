const express = require("express");
const router = express.Router();
const { createClient, getClients } = require("../controllers/clientController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, createClient);
router.get("/", auth, getClients);

module.exports = router;
