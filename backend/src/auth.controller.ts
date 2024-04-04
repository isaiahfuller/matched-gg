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

  @Get('steam') // TODO: Change to Post when front-end is implemented
  @UseGuards(AuthGuard('steam'))
  @HttpCode(HttpStatus.OK)
  /**
   * @remarks this is never called due to the authguard sending user to the return route
   */
  login() {}

  @Get('steam/return')
  @UseGuards(AuthGuard('steam'))
  async return(@Req() req: SteamAuthResponse) {
    return req.user;
  }
}
