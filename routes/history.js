import express from 'express';
import { postHistoryEntry, getHistory, deleteOneHistoryEntry, updateOneHistoryEntry, getOneHistoryEntry } from '../controllers/historyController.js';

const router = express.Router();

router.get('/', getHistory);

router.post('/', postHistoryEntry);

router.delete('/:id', deleteOneHistoryEntry);

router.get('/:id', getOneHistoryEntry);

router.put('/:id', updateOneHistoryEntry);

export default router;