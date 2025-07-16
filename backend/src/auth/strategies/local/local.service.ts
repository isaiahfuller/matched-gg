import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { Users } from 'src/infrastructure/local/db/schema/users';

import { UsersService } from '../../../users/users.service';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/**
 * Requires 8 characters, mixed capitalization, number, and special character
 */
const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])(?=.*?.).{8,}$/m;

@Injectable()
export class LocalService {
  private readonly logger = new Logger('LocalService');
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  async deleteAccount(id: number) {
    const user = await this.usersService.delete(id);
    if (!user) throw new BadRequestException('Account deletion failed');
    return user;
  }

  /**
   * Checks for an existing account with the same email, creates new account if one isn't found
   * @param user - New user name, email, password
   * @returns New user data
   */
  async signup(user: Users) {
    const existing = await this.usersService.findOne(user.email!);
    if (existing) throw new BadRequestException('User already exists');
    if (!user.email || !user.email.match(emailRegex))
      throw new BadRequestException('Invalid email');
    if (!user.password || !user.password.match(passwordRegex))
      throw new BadRequestException('Invalid password');
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const res = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });
    return res[0];
  }

  /**
   *
   * @param username - Username
   * @param pass - Password
   * @returns User data if password matches, null if email not found or password doesn't match
   *
   * @deprecated
   * Currently, not all accounts will have an email/password
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) throw new BadRequestException('Incorrect data');
    if (user && user.password) {
      const { password, ...result } = user;
      const compared = await bcrypt.compare(pass, password);
      if (compared === true) return result;
      else throw new BadRequestException('Incorrect data');
    }
    return null;
  }
}
