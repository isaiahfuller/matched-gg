import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { SteamOpenIdUserProfile } from 'passport-steam-openid';
import { client } from 'src/db/db';

import { steamProfiles, steamProfilesRelations } from '../schema/steamProfiles';
import { Users, users, usersRelations } from '../schema/users';

export default class UserHandler {
  db;
  constructor() {
    this.db = drizzle(client, {
      schema: { steamProfiles, steamProfilesRelations, users, usersRelations },
    });
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

  async addSteamProfile(user, profile: SteamOpenIdUserProfile) {
    const newProfile = await this.db
      .insert(steamProfiles)
      .values({
        avatar: profile.avatarhash,
        name: profile.personaname,
        steamId: profile.steamid,
        url: profile.profileurl,
        userId: user.id,
      })
      .returning();
    return this.db
      .update(users)
      .set({ steamId: newProfile[0].steamId })
      .where(eq(users.id, user.id))
      .returning({
        email: users.email,
        name: users.name,
      });
  }

  async deleteUser(email) {
    await this.db.delete(users).where(eq(users.email, email)).returning({
      email: users.email,
      name: users.name,
      password: users.password,
    });
  }

  async findById(uid: number) {
    const result = await this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, uid),
      with: {
        steam: true,
      },
    });
    return result;
  }

  async findBySteamId(steamId: number) {
    const result = await this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.steamId, steamId),
      with: {
        steam: true,
      },
    });
    if (!result) return null;
    return result;
  }

  async findOneByEmail(userEmail: string) {
    const result = await this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, userEmail),
      with: {
        steam: true,
      },
    });
    if (!result) return null;
    return result;
  }

  async updateUser({ email = null, id, name = null, password = null }) {
    const updatedUser: Users | any = {};
    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (password) updatedUser.password = password;
    updatedUser.updatedAt = new Date();
    await this.db
      .update(users)
      .set(updatedUser)
      .where(eq(users.id, id))
      .returning({
        email: users.email,
        name: users.name,
      });
  }
}
