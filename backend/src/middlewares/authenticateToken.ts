import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from '../config';

interface Payload {
  sub: string;
}

export function authenticateToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    response.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = verify(token, config.JWT_SECRET) as Payload;
    request.user = {
      id: decoded.sub,
    };
    return next();
  } catch (error) {
    response.status(401).json({ error: 'Invalid token.' });
  }
}
