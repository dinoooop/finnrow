import express from 'express';
import { login, register, check } from '../controllers/authController.js';
import multer from 'multer';
import { auth, genVal } from '../middlewares/common.js';

const router = express.Router();
const upload = multer();

router.post('/login', upload.none(), genVal, login);
router.post('/register', upload.none(), genVal, register);
router.get('/check', auth, check);

export default router;