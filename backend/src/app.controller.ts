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
import { LocalService } from './auth/strategies/local/local.service';

@Controller()
export class AppController {
  private readonly logger = new Logger('AppController');
  constructor(
    private readonly appService: AppService,
    private localService: LocalService,
    private readonly authService: AuthService,
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
  async login(@Request() req, @Session() session) {
    const tokens = await this.authService.getTokens(req.user);
    // if (tokens) {
    //   session['access_token'] = tokens.access_token;
    //   session['refresh_token'] = tokens.access_token;
    // }
    // console.log(session);
    return tokens;
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('logout')
  async logout(@Request() req) {
    this.authService.logout(req.user.sub);
  }

  @Post('/local/auth/signup')
  async signup(@Request() req, @Session() session) {
    const tokens = await this.localService.signup(req.body.user);
    // if (tokens) {
    //   session['access_token'] = tokens.access_token;
    //   session['refresh_token'] = tokens.access_token;
    // }
    // console.log(session);
    return tokens;
  }
}
