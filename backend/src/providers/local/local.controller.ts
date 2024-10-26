import {
  BadRequestException,
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
    session.user = req.user;
    return session.user;
    // return tokens;
  }

  @Post('auth/signup')
  async signup(@Request() req, @Session() session) {
    const user = await this.localService.signup(req.body.user);
    if (!user) throw new BadRequestException('Registration failed');
    session.user = user;
    return session.user;
  }
}
