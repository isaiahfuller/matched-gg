import { config } from '@config/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthModuleOptions, PassportStrategy } from '@nestjs/passport';
import { DoneCallback } from 'passport';
import {
  SteamOpenIdStrategy,
  SteamOpenIdStrategyOptionsWithProfile,
  SteamOpenIdUserProfile,
  VerifyCallback,
} from 'passport-steam-openid';

import { DoneFn } from '../../providers/steam/types';
import { SteamService } from './steam.service';

@Injectable()
export class SteamStrategy extends PassportStrategy(
  SteamOpenIdStrategy<SteamOpenIdStrategyOptionsWithProfile>,
) {
  public failureRedirect: string = this.options['failureRedirect'];

  public successRedirect: string = this.options['successRedirect'];
  constructor(
    private steamService: SteamService,
    private options: AuthModuleOptions,
  ) {
    super(
      {
        apiKey: config.steam.apiKey,
        profile: true,
        // TODO: Stop hardcoding the return & realm URLs
        returnURL: 'http://localhost:4468/steam/auth/',
      } satisfies SteamOpenIdStrategyOptionsWithProfile,
      (async (
        req: Request,
        identifier: string,
        profile: SteamOpenIdUserProfile,
        done: DoneCallback,
      ) => {
        if (!profile || !profile.steamid)
          done(new UnauthorizedException(), profile);
        this.validate(profile, done);
      }) satisfies VerifyCallback<SteamOpenIdUserProfile>,
    );
  }

  async validate(profile: SteamOpenIdUserProfile, done: DoneFn) {
    const user = await this.steamService.validateUser(profile, done);
    return user;
  }
}
