import express from 'express';
import { getCharacters, getOneCharacter, deleteOneCharacter, updateOneCharacter, postCharacter } from '../controllers/peopleController.js';


const router = express.Router();

router.get('/', getCharacters);

router.post('/', postCharacter);

router.delete('/:id', deleteOneCharacter);

router.get('/:id', getOneCharacter);

router.put('/:id', updateOneCharacter);

export default router;