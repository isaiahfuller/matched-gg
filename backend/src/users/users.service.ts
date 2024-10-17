import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  users: User[];

  constructor() {
    this.users = [
      {
        password: 'changeme',
        userId: 1,
        username: 'john',
      },
      {
        password: 'guess',
        userId: 2,
        username: 'maria',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
