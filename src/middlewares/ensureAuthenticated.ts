import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

type IPayload = {
  sub: string;
};

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    const secret = process.env.SECRET_KEY as string;

    const { sub } = verify(token, secret) as IPayload;

    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
