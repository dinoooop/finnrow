import express from 'express';
import { test } from '../controllers/testController.js';
import multer from 'multer';
import { auth, genVal } from '../middlewares/common.js';

const router = express.Router();

router.get('/', test);

export default router;
