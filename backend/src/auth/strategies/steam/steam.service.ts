import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SteamService {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  async validateUser(identifier, profile, done) {
    let err: UnauthorizedException | null = null;
    if (!identifier) {
      err = new UnauthorizedException();
    }

    if (!profile) {
      err = new UnauthorizedException();
    }
    done(err, profile);
  }
}
