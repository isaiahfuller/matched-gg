import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { client } from 'src/db/db';

import { Users, usersTable } from '../schema/users';

export default class UserHandler {
  db;
  constructor() {
    this.db = drizzle(client, { schema: { usersTable } });
  }

  async addNewUser({ email, name, password }: Users) {
    return this.db
      .insert(usersTable)
      .values({ email, name, password })
      .returning({
        createdAt: usersTable.createdAt,
        email: usersTable.email,
        id: usersTable.id,
        name: usersTable.name,
        updatedAt: usersTable.updatedAt,
      });
  }
  async deleteUser(email) {
    await this.db
      .delete(usersTable)
      .where(eq(usersTable.email, email))
      .returning({
        email: usersTable.email,
        name: usersTable.name,
        password: usersTable.password,
      });
  }

  async findById(id: number) {
    const result = await this.db.query.usersTable.findFirst({
      where: (usersTable, { eq }) => eq(usersTable.id, id),
    });
    return result;
  }

  async findOneByEmail(email: string) {
    const result = await this.db.query.usersTable.findFirst({
      where: (usersTable, { eq }) => eq(usersTable.email, email),
    });
    return result;
  }

  async updateUser({
    email = null,
    id,
    name = null,
    password = null,
    refreshToken = null,
  }) {
    const updatedUser: Users | any = {};
    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (password) updatedUser.password = password;
    updatedUser.refreshToken = refreshToken;
    updatedUser.updatedAt = new Date();
    await this.db
      .update(usersTable)
      .set(updatedUser)
      .where(eq(usersTable.id, id))
      .returning({
        email: usersTable.email,
        name: usersTable.name,
        refreshToken: usersTable.refreshToken,
      });
  }
}
