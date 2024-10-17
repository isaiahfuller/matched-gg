import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { client } from 'src/db/db';

import { Users, usersTable } from '../schema/users';

export default class UserHandler {
  db;
  constructor() {
    this.db = drizzle(client, { schema: { usersTable } });
  }

  async addNewUser(name, email, password) {
    const newUser: Users = {
      email,
      name,
      password,
    };
    return this.db.insert(usersTable).values(newUser).returning({
      email: usersTable.email,
      name: usersTable.name,
      password: usersTable.password,
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

  async findOneByEmail(email: string) {
    const result = await this.db.query.users.findOne({
      where: (usersTable, { eq }) => eq(usersTable.email, email),
    });
    return result;
  }

  async updateUser({ email = null, name = null, password = null }) {
    if (!name && !email && !password) return null;
    const updatedUser: Users | any = {};
    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (password) updatedUser.password = password;
    updatedUser.updatedAt = new Date();
    await this.db.update(usersTable).set(updatedUser).returning({
      email: usersTable.email,
      name: usersTable.name,
      password: usersTable.password,
    });
  }
}
