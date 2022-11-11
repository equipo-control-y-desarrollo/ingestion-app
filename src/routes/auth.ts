//Usurios y autenticación

import {Router} from 'express';

import {
    login,
    signup,
} from "../controllers/auth";

import { loginSchema, signupSchema } from '../schemas/auth.schema';
import { validate } from '../utils/validation';

const router = Router();

router.post('/login', validate(loginSchema),login);
router.post('/signup', validate(signupSchema),signup);

export default router;