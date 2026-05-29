import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

const SEGREDO = process.env.JWT_SECRET || "SegredoSuperSecreto";

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token não enviado" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, SEGREDO);

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}
