import express from 'express';
import { auto, regular } from './stController.js';

const router = express.Router();

router.get('/regular', regular);
router.all('/auto/:item', auto);

export default router;