import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../model/user.model';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const exist = User.findOne({ where: { email } });
        if (exist) return res.status(400).json({ message: 'Email already taken!' });
    
        const hashed = await bcrypt.hash(password, 10);

        await User.create({ name, email, password: hashed });

        res.status(201).json({ message: 'Register successfully!' });
    } catch (e) {
        res.status(500).json({ message: 'Internal server error', error: e });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email} });
        if(!user) return res.status(404).json({ message: 'User not found!' });

        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(401).json({ message: 'Password invalid!' });

        const token = jwt.sign({ id: user.id, role: user.role }, 'secretKey', {
            expiresIn: '1d',
        });

        res.json({ message: 'Login successful!', token });
    } catch (e) {
        res.status(500).json({ message: 'Internal server error', error: e });
    }
}