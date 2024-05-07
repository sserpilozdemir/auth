import express from 'express';

import { authenticateUserToken } from '../middlewares/authorization.js';
import userControllers from '../controllers/userControllers.js';
import userAuthControllers from '../controllers/userAuthControllers.js';

const router = express.Router();

router.post('/register', userAuthControllers.registerUser);
router.post('/auth/login', userAuthControllers.userLogin);
router.post('/auth/token/refresh', userAuthControllers.refreshTokenHandler);
router.post('/todos/create', authenticateUserToken, userControllers.insertActionTodo);
router.post('/todos/update', authenticateUserToken, userControllers.updateTask);


export { router };