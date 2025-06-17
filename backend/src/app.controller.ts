import {
  Controller,
  Get,
  Logger,
  Post,
  Session,
  UnauthorizedException,
} from '@nestjs/common';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  private readonly logger = new Logger('AppController');
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  /**
   *
   * @param session User's session
   * @returns User data
   */
  @Post('profile')
  getProfile(@Session() session) {
    const send = { ...session.user };
    return send;
  }

  /**
   * Delete's user session
   * @param session - User's session
   */
  @Get('logout')
  async logout(@Session() session) {
    session.destroy();
  }

  /**
   * Checks user's session for user data and returns it if present
   * @param session User's session
   * @returns User data
   */
  @Post('verify')
  async verify(@Session() session) {
    if (!session.user) throw new UnauthorizedException('Not signed in');
    return {
      profile: {
        email: session.user.email,
        id: session.user.id,
        name: session.user.name,
        steam: session.user.steam || null,
        steamId: session.user.steamId || null,
      },
      valid: true,
    };
  }
}
