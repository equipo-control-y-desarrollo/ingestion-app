//Usurios y autenticación

import {Router} from 'express';

import {
    login,
    signup,
} from "../controllers/auth";

import { loginSchema, signupSchema } from '../schemas/auth.schema';
import { verifyAdmin } from '../utils/jwt';
import { validate } from '../utils/validation';

const router = Router();

router.post('/login', validate(loginSchema),login);
router.post('/signup', [validate(signupSchema), verifyAdmin],signup);

export default router;