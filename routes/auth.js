import { Router } from 'express';
import {login} from '../controllers/auth.js';

const router = Router();

// posts
router.post('/login', login);

// gets

export default router;
