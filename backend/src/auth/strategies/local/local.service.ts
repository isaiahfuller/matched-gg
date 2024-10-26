import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { Users } from 'src/infrastructure/local/db/schema/users';

import { UsersService } from '../../../users/users.service';

@Injectable()
export class LocalService {
  private readonly logger = new Logger('LocalService');
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  async signup(user: Users) {
    const existing = await this.usersService.findOne(user.email);
    if (existing) throw new BadRequestException('User already exists');
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const res = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });
    return res[0];
    // return this.authService.getTokens(res[0]);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) throw new BadRequestException('User does not exist');
    if (user && user.password) {
      const { password, ...result } = user;
      const compared = await bcrypt.compare(pass, password);
      if (compared === true) return result;
      else throw new BadRequestException('Password is incorrect');
    }
    return null;
  }
}
