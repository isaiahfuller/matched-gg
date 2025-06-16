import {
  Controller,
  Get,
  Logger,
  Post,
  Request,
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

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('profile')
  getProfile(@Session() session) {
    const send = { ...session.user };
    return send;
  }

  @Get('logout')
  async logout(@Request() req) {
    this.authService.logout(req.user.sub);
  }

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
