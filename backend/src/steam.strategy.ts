import { Strategy } from 'passport-steam';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Options, ValidateFn } from './types';
import { config } from '@config/config';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy<Options>) {
  constructor(private authService: AuthService) {
    super(
      {
        returnURL: 'http://localhost:3000/auth/steam/return',
        realm: 'http://localhost:3000/',
        apiKey: config.steam.apiKey,
      } satisfies Options,
      (async (identifier, profile, done) => {
        await this.validate(identifier, profile, done);
      }) satisfies ValidateFn<any>,
    );
  }

  async validate(identifier, profile, done) {
    const user = await this.authService.validateUser(identifier, profile, done);
    return user;
  }
}
