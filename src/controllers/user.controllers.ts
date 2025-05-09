import { Request, Response } from "express";
import { prisma } from "../database/prisma.js";
import { TLoginRequest, TUserRequest } from "../schemas/user.schemas.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserController {
  async register(req: Request, res: Response) {
    const { name, email, password }: TUserRequest = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(409).json({ message: "This email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password }: TLoginRequest = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not exists" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Email and password doesn't match" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "12h" }
    );

    return res.json({
      accessToken: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }

  async profile(req: Request, res: Response) {
    const { user } = res.locals;

    const userProfile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return res.json(userProfile);
  }
} 