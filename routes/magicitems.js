import express from 'express';
import { postMagicItem, getMagicItems, getOneMagicItem, deleteOneMagicItem, updateOneMagicItem } from '../controllers/magicItemController.js';

const router = express.Router();

router.get('/', getMagicItems);

router.post('/', postMagicItem);

router.delete('/:id', deleteOneMagicItem);

router.get('/:id', getOneMagicItem);

router.put('/:id', updateOneMagicItem);

export default router;