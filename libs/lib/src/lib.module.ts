import { Module } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LibService } from './lib.service';
import { Jwt } from './shared/jwt.service';

@Module({
  providers: [LibService],
  exports: [LibService, AuthGuard, Jwt],
})
export class LibModule {}
