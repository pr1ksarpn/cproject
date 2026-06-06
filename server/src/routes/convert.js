const express = require('express');
const multer = require('multer');
const path = require('path');

const { convertWordBufferToJpg } = require('../utils/converter');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024,
    files: 10,
  },
});

const allowedExtensions = new Set(['.doc', '.docx']);

router.post('/', upload.array('files', 10), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'Please upload at least one Word document.' });
  }

  const results = [];
  const errors = [];

  await Promise.all(
    req.files.map(async (file) => {
      const extension = path.extname(file.originalname).toLowerCase();

      if (!allowedExtensions.has(extension)) {
        errors.push({
          file: file.originalname,
          message: 'Unsupported file type. Upload .doc or .docx files only.',
        });
        return;
      }

      try {
        const images = await convertWordBufferToJpg(file.buffer);
        results.push({
          fileName: file.originalname,
          images,
        });
      } catch (error) {
        errors.push({
          file: file.originalname,
          message: 'Unable to convert this document. Please verify it is a valid Word file.',
        });
      }
    })
  );

  return res.json({
    files: results,
    errors,
  });
});

module.exports = router;
