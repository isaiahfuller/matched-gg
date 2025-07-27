import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';

@Module({
  exports: [PassportModule, AuthService, UsersService],
  imports: [PassportModule.register({ session: true })],
  providers: [SessionSerializer, UsersService, AuthService],
})
export class AuthModule {}
