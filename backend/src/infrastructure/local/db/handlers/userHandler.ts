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

  /**
   * Creates a user account with email, name, and password
   * @param user - User data
   * @returns New user account
   */
  async addNewUser({ email, name, password, steamId }: Users) {
    return this.db
      .insert(users)
      .values({
        email: email || null,
        name,
        password: password || null,
        steamId: steamId || null,
      })
      .returning({
        createdAt: users.createdAt,
        email: users.email,
        id: users.id,
        name: users.name,
        steamId: users.steamId,
        updatedAt: users.updatedAt,
      });
  }

  /**
   *
   * @param user - User data
   * @param profile - Steam profile data
   * @returns Steam profile data
   */
  async addSteamProfile(
    user: { id: number } & Users,
    profile: SteamOpenIdUserProfile,
  ) {
    const newProfile = await this.db
      .insert(steamProfiles)
      .values({
        avatarhash: profile.avatarhash,
        personaname: profile.personaname,
        profileurl: profile.profileurl,
        steamid: profile.steamid,
        userId: user.id,
      })
      .returning();
    return this.db
      .update(users)
      .set({ steamId: newProfile[0].steamid })
      .where(eq(users.id, user.id))
      .returning({
        name: users.name,
      });
  }

  /**
   *
   * @param id - User's id
   * @returns Deleted user's info
   */
  async deleteUser(id: number) {
    return await this.db.delete(users).where(eq(users.id, id)).returning({
      id: users.id,
    });
  }

  /**
   *
   * @param id - User id
   * @returns User account info
   */
  async findById(uid: number) {
    const result = await this.db.query.users.findFirst({
      where: (users: { id: number } & Users, { eq }) => eq(users.id, uid),
      with: {
        steam: true,
      },
    });
    return result;
  }

  /**
   *
   * @param id - User Steam id
   * @returns User account info
   */
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

  /**
   *
   * @param email - User email address
   * @returns User account, null if email doesn't match
   */
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

  /**
   *
   * @param user - Changed user info
   * @returns The updated user info
   */
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
