import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SteamService {
  constructor() {}

  async validateUser(identifier, profile, done) {
    if (!identifier) {
      throw new UnauthorizedException();
    }

    if (!profile) {
      throw new UnauthorizedException();
    }
    done(null, profile);
  }
}
