import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../model/user.model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const exist = await User.findOne({ where: { email } });
        if (exist) {
            return res.status(400).json({ message: 'Email already taken!' });
        }

        console.log('Exist:', exist ? 'Found' : 'Not found');
    
        const hashed = await bcrypt.hash(password, 10);

        await User.create({ name, email, password: hashed });

        res.status(201).json({ message: 'Register successfully!' });
    } catch (e) {
        console.log('Error:', e);
        res.status(500).json({ message: 'Internal server error', error: e });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        console.log("users:", user?.dataValues);

        if (!user) return res.status(404).json({ message: 'User not found!' });

        const match = await bcrypt.compare(password, user.dataValues.password);
        if (!match) return res.status(401).json({ message: 'Password invalid!' });

        console.log('Password match, generating token...');

        const token = jwt.sign({ id: user.dataValues.id, role: user.dataValues.role }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        console.log('Token generated successfully:', token);

        res.status(200).json({ message: 'Login successful!', token, userId: user.dataValues.id });
    } catch (e) {
        console.error("Error during login:", e);
        res.status(500).json({ message: 'Internal server error', error: e });
    }
}
