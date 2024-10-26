import { config } from '@config/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthModuleOptions, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'modern-passport-steam';

import {
  DoneFn,
  Options,
  SteamProfile,
  ValidateFn,
} from '../../../providers/steam/types';
import { SteamService } from './steam.service';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy<Options>) {
  public failureRedirect: string = this.options['failureRedirect'];

  public successRedirect: string = this.options['successRedirect'];
  constructor(
    private steamService: SteamService,
    private options: AuthModuleOptions,
  ) {
    super(
      {
        apiKey: config.steam.apiKey,
        passReqToCallback: true,
        realm: 'http://localhost:3000/',
        // TODO: Stop hardcoding the return & realm URLs
        returnUrl: 'http://localhost:3000/steam/auth/return',
      } satisfies Options,
      (async (user, done) => {
        if (!user || !user.SteamID) done(new UnauthorizedException(), user);
        this.validate(user, done);
      }) satisfies ValidateFn<any>,
    );
  }

  async validate(profile: SteamProfile, done: DoneFn) {
    const user = await this.steamService.validateUser(profile, done);
    return user;
  }
}
