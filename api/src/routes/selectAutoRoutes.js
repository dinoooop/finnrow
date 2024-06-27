import express from 'express';
import { auto } from '../controllers/selectAutoController.js';

const router = express.Router();

// router.get('/select-regular', regular);
router.all('/:item', auto);

export default router;