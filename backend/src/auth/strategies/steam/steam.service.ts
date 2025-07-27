import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SteamOpenIdUserProfile } from 'passport-steam-openid';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

import { DoneFn } from '../../providers/steam/types';

@Injectable()
export class SteamService {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  async validateUser(user: SteamOpenIdUserProfile, done: DoneFn) {
    let err: UnauthorizedException | null = null;
    if (!user) {
      err = new UnauthorizedException();
    }
    done(err, user);
  }
}
