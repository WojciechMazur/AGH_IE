import { Router } from 'express'
import trainingSession from './trainingSession'
import training from './training'
import trainer from './trainer'
import user from './user'

const router = new Router();
router.use('/trainingSessions', trainingSession);
router.use('/trainings', training);
router.use('/trainers', trainer);
router.use('/users', user);

export default router