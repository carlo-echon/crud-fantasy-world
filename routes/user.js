import express from 'express';
import { v4 as uuidv4 } from 'uuid';        
import { deleteOneUser, getOneUser, getUsers, postUser, updateOneUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);

router.post('/', postUser);

router.delete('/:id', deleteOneUser);

router.get('/:id', getOneUser);

router.put('/:id', updateOneUser);

export default router;