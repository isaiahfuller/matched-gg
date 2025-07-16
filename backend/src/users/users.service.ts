import { Injectable, Logger } from '@nestjs/common';
import { SteamOpenIdUserProfile } from 'passport-steam-openid';
import UserHandler from 'src/infrastructure/local/db/handlers/userHandler';
import { Users } from 'src/infrastructure/local/db/schema/users';

export type User = any;

/**
 * @see {@link UserHandler} as all function utilize it
 */
@Injectable()
export class UsersService {
  private readonly logger = new Logger('UserService');
  userHandler: UserHandler;
  constructor() {
    this.userHandler = new UserHandler();
  }

  /**
   *
   * @param user - User data
   * @param profile - Steam profile data
   * @returns Steam profile data
   */
  async addSteam(user, profile) {
    const newUser = await this.userHandler.addSteamProfile(user, profile);
    return newUser;
  }

  /**
   * Creates a user account with email, name, and password
   * @param user - User data
   * @returns New user account
   */
  async create({ email, name, password }: Users) {
    const newUser = await this.userHandler.addNewUser({
      email,
      name,
      password,
    });
    return newUser;
  }

  /**
   * Creates a user account with Steam profile data
   * @param user - Steam profile data
   * @returns New user account
   */
  async createSteam(user: SteamOpenIdUserProfile) {
    const newUser = await this.userHandler.addNewUser({
      name: user.personaname,
      steamId: user.steamid,
    });
    await this.addSteam(newUser[0], user);
    return newUser;
  }

  /**
   *
   * @param email - User's email
   * @returns Deleted user's info
   */
  async delete(email) {
    const res = await this.userHandler.deleteUser(email);
    return res;
  }

  /**
   *
   * @param id - User id
   * @returns User account info
   */
  async findById(id) {
    return await this.userHandler.findById(id);
  }

  /**
   *
   * @param id - User Steam id
   * @returns User account info
   */
  async findBySteamId(id) {
    return await this.userHandler.findBySteamId(id);
  }

  /**
   *
   * @param email - User email address
   * @returns User account, null if email doesn't match
   */
  async findOne(email: string): Promise<User | null> {
    const res = await this.userHandler.findOneByEmail(email);
    return res;
  }

  /**
   *
   * @param user - Changed user info
   * @returns The updated user info
   */
  async update({ email = null, id, name = null, password = null }) {
    const res = await this.userHandler.updateUser({
      email,
      id,
      name,
      password,
    });
    this.logger.log(`User ${id} updated`);
    return res;
  }
}
