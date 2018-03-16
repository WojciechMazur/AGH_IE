import { Router } from 'express'
import trainingSession from './trainingSession'
import training from './training'
import trainer from './trainer'

const router = new Router();
router.use('/trainingSessions', trainingSession);
router.use('/trainings', training);
router.use('/trainers', trainer);

export default router