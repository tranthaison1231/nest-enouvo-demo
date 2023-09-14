import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthenticationSessionMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, _res: Response, next: NextFunction) {
    try {
      if (!(req.session as any).userId) {
        throw 'Session Expired';
      }

      next();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
