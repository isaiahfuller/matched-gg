import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  Session,
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
  async return(@Session() session, @Req() req: SteamAuthResponse, @Res() res) {
    session.profile = req.user._json;
    // TODO: Stop hardcoding the redirect URL
    res.redirect('http://localhost:5173/');
    return session;
  }

  @Post('steam/valid')
  async validate(@Session() session, @Req() req, @Body() body, @Res() res) {
    res.send(session.profile);
    return session;
  }
}
