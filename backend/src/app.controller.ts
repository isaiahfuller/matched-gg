import {
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppService } from './app.service';
import { LocalService } from './auth/strategies/local/local.service';

@Controller()
export class AppController {
  private readonly logger = new Logger('AppController');
  constructor(
    private readonly appService: AppService,
    private localService: LocalService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('local/auth/login')
  async login(@Request() req) {
    return this.localService.login(req.user);
  }
  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('logout')
  async logout(@Request() req) {
    this.localService.logout(req.user.sub);
  }

  @Post('/local/auth/signup')
  async signup(@Request() req) {
    return this.localService.signup(req.body.user);
  }
}
