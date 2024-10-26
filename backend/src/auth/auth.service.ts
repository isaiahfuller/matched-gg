import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(private usersService: UsersService) {}

  async logout(id: number) {
    return this.usersService.update({ id });
  }
}
