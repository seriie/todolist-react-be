import { Request, Response } from 'express';
import User from '../model/user.model';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: ['id', 'name', 'email', 'role', 'created_at'],
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};