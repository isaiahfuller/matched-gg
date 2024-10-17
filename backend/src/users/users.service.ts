import { Injectable, Logger } from '@nestjs/common';
import UserHandler from 'src/infrastructure/local/db/handlers/userHandler';
import { Users } from 'src/infrastructure/local/db/schema/users';

export type User = any;

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UserService');
  userHandler: UserHandler;
  constructor() {
    this.userHandler = new UserHandler();
  }

  async create({ email, name, password }: Users) {
    const newUser = await this.userHandler.addNewUser({
      email,
      name,
      password,
    });
    return newUser;
  }

  async delete(email) {
    const res = await this.userHandler.deleteUser(email);
    return res;
  }

  async findById(id) {
    return await this.userHandler.findById(id);
  }

  async findOne(email: string): Promise<User | undefined> {
    const res = await this.userHandler.findOneByEmail(email);
    return res;
  }
  async update({
    email = null,
    id,
    name = null,
    password = null,
    refreshToken = null,
  }) {
    const res = await this.userHandler.updateUser({
      email,
      id,
      name,
      password,
      refreshToken,
    });
    this.logger.log(`User ${id} updated`);
    return res;
  }
}
