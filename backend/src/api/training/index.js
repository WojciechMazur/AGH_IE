import { Router } from 'express'
import {index, show, create, edit, remove, populate} from './controller'


const router = new Router();
router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', edit);
router.delete('/:id', remove);

export default router