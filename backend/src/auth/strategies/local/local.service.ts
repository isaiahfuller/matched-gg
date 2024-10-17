import { config } from '@config/config';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { Users } from 'src/infrastructure/local/db/schema/users';

import { UsersService } from '../../../users/users.service';

@Injectable()
export class LocalService {
  private readonly logger = new Logger('LocalService');
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, username: user.email };
    const tokens = {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '15m',
        secret: config.authSecrets.jwt,
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: config.authSecrets.jwtRefresh,
      }),
    };
    await this.updateRefreshTokens(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(id: number) {
    return this.usersService.update({ id, refreshToken: null });
  }

  async refreshTokens(id: number, refreshToken: string) {
    const user = await this.usersService.findById(id);
    if (!user || !user.refreshToken) return null;
    const refreshTokenMatches = await bcrypt.validate(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) return null;
    const tokens = await this.login({ id: id, username: user.email });
    await this.updateRefreshTokens(id, tokens.refresh_token);
  }

  async signup(user: Users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const res = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });
    return this.login(res[0]);
  }

  async updateRefreshTokens(id: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.update({ id, refreshToken: hashedRefreshToken });
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password) {
      const { password, ...result } = user;
      const compared = await bcrypt.compare(pass, password);
      if (compared === true) return result;
    }
    return null;
  }
}
