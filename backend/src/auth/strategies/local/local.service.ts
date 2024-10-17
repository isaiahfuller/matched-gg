import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { jwtConstants } from 'src/auth/constants';

import { UsersService } from '../../../users/users.service';

@Injectable()
export class LocalService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret, // CHANGE THIS LATER
      }),
    };
  }
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password) {
      const { password, ...result } = user;
      const hashedUserPass = await bcrypt.hash(password, 10);
      const compared = await bcrypt.compare(pass, hashedUserPass);
      if (compared === true) return result;
    }
    return null;
  }
}
