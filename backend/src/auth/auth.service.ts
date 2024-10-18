import { config } from '@config/config';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async getTokens(user) {
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
    const tokens = await this.getTokens({
      id: id,
      username: user.email,
    });
    await this.updateRefreshTokens(id, tokens.refresh_token);
  }

  async updateRefreshTokens(id: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.update({ id, refreshToken: hashedRefreshToken });
  }
}
