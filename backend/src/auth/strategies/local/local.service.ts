import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { Users } from 'src/infrastructure/local/db/schema/users';

import { UsersService } from '../../../users/users.service';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])(?=.*?.).{8,}$/m;

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
    if (!user.email.match(emailRegex))
      throw new BadRequestException('Invalid email');
    if (!user.password.match(passwordRegex))
      throw new BadRequestException('Invalid password');
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const res = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });
    return res[0];
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
