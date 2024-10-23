import {
  Controller,
  Get,
  Logger,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  getProfile(@Session() session) {
    const send = { ...session.user };
    delete send.refreshToken;
    return send;
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('logout')
  async logout(@Request() req) {
    this.authService.logout(req.user.sub);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('auth/refresh')
  async refreshTokens(@Request() req) {
    const res = await this.authService.refreshTokens(
      req.user.sub,
      req.user.refreshToken,
    );
    return res;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('verify')
  async verify() {
    return { valid: true };
  }
}
