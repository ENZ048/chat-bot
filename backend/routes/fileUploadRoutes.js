const express = require("express");
const router = express.Router();
const upload = require("../middleware/fileUpload");
const auth = require("../middleware/authMiddleware");
const { uploadTxtFile } = require("../controllers/fileUploadController");

router.post("/upload-txt/:chatbotId", auth, upload.single("file"), uploadTxtFile);

module.exports = router;
