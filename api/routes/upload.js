import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
import { errorHandler } from '../utils/error.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const uploadRes = await cloudinary.uploader.upload(fileStr, {
      folder: 'blog-posts',
    });
    res.status(200).json({ url: uploadRes.secure_url });
  } catch (error) {
    next(errorHandler(500, 'Cloudinary upload failed'));
  }
});

export default router;
