import { Router } from 'express'
import trainingSession from './trainingSession'
import training from './training'
import trainer from './trainer'
import user from './user'
import auth from './auth'
import {loginRequired} from "./auth/controller";
import {success} from "../services/response";

const router = new Router();
router.use('/trainingSessions', loginRequired, trainingSession);
router.use('/trainings', loginRequired, training);
router.use('/trainers', loginRequired, trainer);
router.use('/users', loginRequired, user);
router.use('/auth', auth);

function showAPI(req, res, next){
    success(res)({
        unauthorized: {
            auth: {
                post: {
                    "/api/auth/sign_in": "post",
                    "/api/auth/register": "post"
                },
            }
        },
        authorized: {
            trainer: {
                get: {
                    "/api/trainer/": "index",
                    "/api/trainer/{id}": "show",
                },
                post: {
                    "/api/trainer": "create",
                },
                put: {
                    "/api/trainer/{id}": "put",
                },
                "delete": {
                    "api/trainer/{id}": "delete",
                }
            },
            training: {
                get: {
                    "/api/training/": "index",
                    "/api/training/{id}": "show",
                },
                post: {
                    "/api/training": "create",
                    "/api/training/:trainingId/user/:userId": "add user to training"
                },
                put: {
                    "/api/training/{id}": "put"
                },
                "delete": {
                    "api/training/{id}": "delete"
                }
            }
        }
    })
}

router.get('/', showAPI);

export default router
