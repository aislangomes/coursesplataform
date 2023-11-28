import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ Error: "User not found" });
    }

    const isValuePassword = await compare(password, user.password);

    if (!isValuePassword) {
      return res.status(404).json({ Error: "Password invalid" });
    }

    const secretKey = process.env.HASH;
    if (!secretKey) {
      return res.status(500).json({ Error: "Secret key not configured" });
    }

    const token = sign({ id: user.id }, secretKey, { expiresIn: "1d" });

    const { id } = user;

    return res.json({ user: { id, email }, token });
  }
}
