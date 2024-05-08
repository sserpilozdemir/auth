import express from 'express';

import { authenticateUserToken } from '../middlewares/authorization.js';
import userControllers from '../controllers/userControllers.js';

const todoRouters = express.Router();

todoRouters.post('/todos/create', authenticateUserToken, userControllers.insertActionTodo);
todoRouters.post('/todos/update', authenticateUserToken, userControllers.updateTask);


export { todoRouters };