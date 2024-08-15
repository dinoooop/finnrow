import express from 'express';
import { index, store, update, destroy, show } from '../controllers/reportController.js';
import multer from 'multer';
import { auth, genVal } from '../middlewares/common.js';

const router = express.Router();
const upload = multer();

router.get('/', auth, index);
router.post('/', upload.single('cover'), auth, genVal, store);
router.get('/:id', show);
router.put('/:id', upload.none(), auth, update);
router.delete('/:id', auth, destroy);

export default router;
