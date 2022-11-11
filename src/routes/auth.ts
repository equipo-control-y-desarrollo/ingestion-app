//Usurios y autenticación

import {Router} from 'express';

import {
    login,
    signup,
} from "../controllers/auth";

import { loginValidation, signupValidation } from '../Schemas/auth.schemas';
import { validate } from '../utils/validation';

const router = Router();

router.post('/login', validate(loginValidation),login);
router.post('/signup', validate(signupValidation),signup);

export default router;