import { config } from '@config/config';

export const jwtConstants = {
  secret: config.sessionSecret,
};
