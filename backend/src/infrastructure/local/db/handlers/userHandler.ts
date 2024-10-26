import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { client } from 'src/db/db';
import { SteamProfile } from 'src/providers/steam/types';

import { steamProfiles } from '../schema/steamProfiles';
import { Users, users } from '../schema/users';

export default class UserHandler {
  db;
  constructor() {
    this.db = drizzle(client, { schema: { users } });
  }

  async addNewUser({ email, name, password }: Users) {
    return this.db.insert(users).values({ email, name, password }).returning({
      createdAt: users.createdAt,
      email: users.email,
      id: users.id,
      name: users.name,
      updatedAt: users.updatedAt,
    });
  }

  async addSteamProfile(user, profile: SteamProfile) {
    const newProfile = await this.db
      .insert(steamProfiles)
      .values({ steamId: BigInt(profile.profile.steamid), userId: user.id })
      .returning();
    console.log(newProfile[0]);
    return this.db
      .update(users)
      .set({ steamId: BigInt(newProfile[0].steamId) })
      .where(eq(users.id, user.id))
      .returning({
        email: users.email,
        name: users.name,
        refreshToken: users.refreshToken,
      });
  }

  async deleteUser(email) {
    await this.db.delete(users).where(eq(users.email, email)).returning({
      email: users.email,
      name: users.name,
      password: users.password,
    });
  }

  async findById(id: number) {
    const result = await this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });
    return result;
  }

  async findBySteamId(id: number) {
    const result = await this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.steamId, BigInt(id)),
    });
    return result;
  }

  async findOneByEmail(email: string) {
    const result = await this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
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
      .update(users)
      .set(updatedUser)
      .where(eq(users.id, id))
      .returning({
        email: users.email,
        name: users.name,
        refreshToken: users.refreshToken,
      });
  }
}
