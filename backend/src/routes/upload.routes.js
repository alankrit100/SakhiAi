const express = require("express");

const multer = require("multer");

const path = require("path");

const fs = require("fs");

const ffmpeg = require("fluent-ffmpeg");

const ffmpegPath = require("ffmpeg-static");

ffmpeg.setFfmpegPath(ffmpegPath);

const {
  transcribeAudio,
} = require("../services/whisper.service");

const {
  generateMedicalResponse,
} = require("../services/llm.service");

const {
  processRiskAlert,
} = require("../services/risk.service");

const router = express.Router();

const uploadsDir = path.join(
  __dirname,
  "../../uploads"
);

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadsDir);
  },

  filename: (_, file, cb) => {
    cb(
      null,
      `upload-${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({
  storage,
});

router.post(
  "/upload-audio",
  upload.single("audio"),

  async (req, res) => {
    try {
      const filePath = req.file.path;

      const convertedPath =
  filePath.replace(".webm", ".mp3");

await new Promise((resolve, reject) => {

  ffmpeg(filePath)

    .toFormat("mp3")

    .on("end", resolve)

    .on("error", reject)

    .save(convertedPath);

});

const transcript =
  await transcribeAudio(
    convertedPath
  );

      const aiResponse =
        await generateMedicalResponse(
          transcript
        );

      const riskData =
        await processRiskAlert(aiResponse);

      return res.status(200).json({
        transcript,
        aiResponse,
        riskData,
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error:
          "Failed to process audio",
      });
    }
  }
);

module.exports = router;