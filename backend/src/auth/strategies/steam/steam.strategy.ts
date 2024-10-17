import { config } from '@config/config';
import { Injectable } from '@nestjs/common';
import { AuthModuleOptions, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam';

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
    private authService: SteamService,
    private options: AuthModuleOptions,
  ) {
    super(
      {
        apiKey: config.steam.apiKey,
        passReqToCallback: true,
        realm: 'http://localhost:3000/',
        // TODO: Stop hardcoding the return & realm URLs
        returnURL: 'http://localhost:3000/steam/auth/return',
      } satisfies Options,
      (async (req, identifier, profile, done) => {
        req.isAuthenticated()
          ? done(req.user)
          : await this.validate(identifier, profile, done);
      }) satisfies ValidateFn<any>,
    );
  }

  async validate(identifier: string, profile: SteamProfile, done: DoneFn) {
    const user = await this.authService.validateUser(identifier, profile, done);
    return user;
  }
}
