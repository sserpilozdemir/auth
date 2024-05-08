import express from 'express';
import userAuthControllers from '../controllers/userAuthControllers.js';

const userAuthRouters = express.Router();

userAuthRouters.post('/register', userAuthControllers.registerUser);
userAuthRouters.post('/auth/login', userAuthControllers.userLogin);
userAuthRouters.post('/auth/token/refresh', userAuthControllers.refreshTokenHandler);

export { userAuthRouters };