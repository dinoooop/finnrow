import express from 'express';
import { auto } from '../controllers/selectAutoController.js';

const router = express.Router();

router.all('/:item', auto);

export default router;