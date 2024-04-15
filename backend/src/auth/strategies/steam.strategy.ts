import { Strategy } from 'passport-steam';
import { PassportStrategy, AuthModuleOptions } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { DoneFn, Options, SteamProfile, ValidateFn } from '../types';
import { config } from '@config/config';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy<Options>) {
  constructor(
    private authService: AuthService,
    private options: AuthModuleOptions,
  ) {
    super(
      {
        // TODO: Stop hardcoding the return & realm URLs
        returnURL: 'http://localhost:3000/auth/steam/return',
        realm: 'http://localhost:3000/',
        apiKey: config.steam.apiKey,
        passReqToCallback: true,
      } satisfies Options,
      (async (req, identifier, profile, done) => {
        req.isAuthenticated()
          ? done(req.user)
          : await this.validate(identifier, profile, done);
      }) satisfies ValidateFn<any>,
    );
  }

  public successRedirect: string = this.options['successRedirect'];
  public failureRedirect: string = this.options['failureRedirect'];

  async validate(identifier: string, profile: SteamProfile, done: DoneFn) {
    const user = await this.authService.validateUser(identifier, profile, done);
    return user;
  }
}
