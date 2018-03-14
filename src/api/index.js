import { Router } from 'express'
import trainingSession from './trainingSession'
import training from './training'
import trainer from './trainer'

const router = new Router();
router.use('/trainingSession', trainingSession);
router.use('/training', training);
router.use('/trainer', trainer);

export default router