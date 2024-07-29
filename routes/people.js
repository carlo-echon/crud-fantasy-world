import express from 'express';
import { getCharacters, getOneCharacter, deleteOneCharacter, updateOneCharacter, postCharacter, getCharacterLocations } from '../controllers/peopleController.js';


const router = express.Router();

router.get('/', getCharacters);

router.post('/', postCharacter);

router.delete('/:id', deleteOneCharacter);

router.get('/:id', getOneCharacter);

router.put('/:id', updateOneCharacter);

router.get('/locations/:id', getCharacterLocations);

export default router;