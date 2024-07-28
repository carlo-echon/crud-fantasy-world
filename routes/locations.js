import express from 'express';
import { getLocations, postLocationEntry, deleteOneLocationEntry, updateOneLocationEntry, getOneLocationEntry, getCharacterLocations } from '../controllers/locationController.js';

const router = express.Router();

router.get('/', getLocations);

router.post('/', postLocationEntry);

router.delete('/:id', deleteOneLocationEntry);

router.get('/:id', getOneLocationEntry);

router.put('/:id', updateOneLocationEntry);

router.get('/characters/:id', getCharacterLocations);

export default router;