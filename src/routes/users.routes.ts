import express from 'express';
import { verifyToken } from 'middlewares/auth.middleware';
import { getUserProfile } from 'controller/user.controller';

const router = express.Router();

router.get('/profile', verifyToken, getUserProfile);

export default router;