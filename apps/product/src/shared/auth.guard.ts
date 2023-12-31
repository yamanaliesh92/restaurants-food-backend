import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { Jwt } from './jwt.service';

export interface IRequest {
  user: {
    id: number;
  };
}

const Header_Name = 'authorization';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: Jwt) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    Logger.log('res', request);

    const token = request.headers[Header_Name];

    Logger.log('token', token);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.decode(token);
      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
