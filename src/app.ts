"use strict";
import express, { Request, Response } from "express";
import authRoutes from './routes/auth.routes';

const app = express();
const port = 9000;

app.use('/api/auth', authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running!" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
