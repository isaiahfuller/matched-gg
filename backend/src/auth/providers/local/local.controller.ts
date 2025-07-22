import {
  BadRequestException,
  Controller,
  Delete,
  Logger,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LocalService } from 'src/auth/strategies/local/local.service';

@Controller('local')
export class LocalController {
  private readonly logger = new Logger(LocalController.name);
  constructor(
    private localService: LocalService,
    private readonly authService: AuthService,
  ) {}

  @Delete('auth/delete')
  async deleteAccount(@Session() session: any) {
    if (!session.user) throw new BadRequestException('No user logged in');
    const user = await this.localService.deleteAccount(session.user.id);
    if (!user) throw new BadRequestException('Account deletion failed');
    session.user = null;
    this.logger.log(`User ${user.id} deleted`);
    session.destroy();
    return { message: 'Account deleted successfully' };
  }

  /**
   *
   * @param req - http request
   * @param session - session
   * @returns Session data with account data
   */
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req: ExpressRequest, @Session() session: any) {
    session.user = req.user;
    this.logger.log(`User ${session.user.id} logged in`);
    return session.user;
  }

  /**
   *
   * @param req - http request
   * @param session - session
   * @returns Session data with newly registered account data
   */
  @Post('auth/signup')
  async signup(@Request() req: ExpressRequest, @Session() session: any) {
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
