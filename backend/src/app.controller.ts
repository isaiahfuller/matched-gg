import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppService } from './app.service';
import { LocalService } from './auth/strategies/local/local.service';

@Controller()
export class AppController {
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
}
