import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class UserController {
  async index(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    return res.json({ users });
  }

  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userExist = await prisma.user.findUnique({ where: { email } });

    if (userExist) {
      return res.status(200).json({ Error: "Email already in use" });
    }

    const hash_password = await hash(password, 8);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash_password,
      },
    });
    return res.json({ user });
  }
}
