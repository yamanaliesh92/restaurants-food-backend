import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from './jwt.service';

export interface IRequest {
  user: {
    id: number;
  };
}

const Header_Name = 'authorization';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers[Header_Name];

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
