import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SteamAuthResponse } from './types';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Get('steam')
  @UseGuards(AuthGuard('steam'))
  @HttpCode(HttpStatus.OK)
  login() {}

  @Get('steam/return')
  @UseGuards(AuthGuard('steam'))
  async return(@Req() req: SteamAuthResponse) {
    return req.user;
  }
}
