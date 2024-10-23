import {
  Controller,
  Logger,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { LocalService } from 'src/auth/strategies/local/local.service';

@Controller('local')
export class LocalController {
  private readonly logger = new Logger('LocalController');
  constructor(
    private localService: LocalService,
    private readonly authService: AuthService,
  ) {}
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req, @Session() session) {
    const tokens = await this.authService.getTokens(req.user);
    session['user'] = req.user;
    if (tokens) {
      session['access_token'] = tokens.access_token;
      session['refresh_token'] = tokens.refresh_token;
    }
    return tokens;
  }
  @Post('auth/signup')
  async signup(@Request() req, @Session() session) {
    const tokens = await this.localService.signup(req.body.user);
    if (tokens) {
      session['access_token'] = tokens.access_token;
      session['refresh_token'] = tokens.refresh_token;
    }
    return tokens;
  }
}
