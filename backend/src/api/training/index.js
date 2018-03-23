import { Router } from 'express'
import {index, show, create, edit, remove, addUser, deleteUser, getUsers} from './controller'


const router = new Router();
router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', edit);
router.put('/:id/user/:userId', addUser);
router.delete('/:id/user/:userId', deleteUser);
router.get('/:id/user/', getUsers);
router.delete('/:id', remove);

export default router