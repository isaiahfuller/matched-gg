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
  private readonly logger = new Logger(LocalController.name);
  constructor(
    private localService: LocalService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req, @Session() session) {
    session.user = req.user;
    this.logger.log(`User ${session.user.id} logged in`);
    return session.user;
  }

  @Post('auth/signup')
  async signup(@Request() req, @Session() session) {
    if (
      !req.body ||
      !req.body.user ||
      !req.body.user.email ||
      !req.body.user.name ||
      !req.body.user.password
    )
      throw new BadRequestException('Field(s) missing.');
    const user = await this.localService.signup(req.body.user);
    if (!user) throw new BadRequestException('Registration failed');
    session.user = user;
    this.logger.log(`User ${session.user.id} created`);
    return session.user;
  }
}
