import express from 'express';
import { index, store, update, destroy, show } from '../controllers/entryController.js';
import multer from 'multer';
import { auth, genVal } from '../middlewares/common.js';

const router = express.Router();
const upload = multer({ dest: '/tmp/' });

router.get('/', auth, index);
router.post('/', upload.none(), auth, genVal, store);
router.get('/:id', show);
router.put('/:id', upload.none(), auth, update);
router.delete('/:id', auth, destroy);

export default router;
