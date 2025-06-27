const express = require("express");
const multer = require("multer");
const router = express.Router();
const { uploadTxtFile } = require("../controllers/fileUploadController");

const upload = multer({ dest: "uploads/" });

router.post("/txt/:chatbotId", upload.single("file"), uploadTxtFile);

module.exports = router;
