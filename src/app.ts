"use strict";
import express, { Request, Response } from "express";
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import cors from 'cors';

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running!" });
});

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

export default app;