import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export function AuthMiddlewares(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token not found" });
  }

  const [, token] = authorization.split(" ");

  try {
    const secretKey = process.env.HASH;
    if (!secretKey) {
      throw new Error("Secret key not configured");
    }

    const decoded = verify(token, secretKey) as TokenPayload;

    const { id } = decoded as TokenPayload;

    req.userId = id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }
}
