import { config } from '@config/config';
import { delay } from '@util/delay';
import logger from '@util/logger';
import TwitchHandler from 'src/infrastructure/twitch/handlers/twitchHandler';

import { IgdbWebhook } from '../../facade/interfaces';
import { IgdbResources } from '../../facade/subsystems/enum/IgdbResources';

const twitch = new TwitchHandler(
  {
    apiUrl: config.twitch.apiUrl,
    clientId: config.twitch.clientId,
    clientSecret: config.twitch.clientSecret,
  },
  logger,
);

const webhooks: IgdbWebhook[] = [];

/**
 * Registers webhooks with IGDB
 */
const addWebhooks = async (): Promise<void> => {
  const accessToken = (await twitch.connect()).access_token;

  /**
   * Send request to register individual webhook
   * @param endpoint - IGDB data endpoint for webhook
   * @param type - 'create', 'update', or 'delete'
   */
  const addWebhook = async (
    endpoint: string,
    type: 'create' | 'delete' | 'update',
  ) => {
    logger.info(`Adding webhook ${type} for endpoint ${endpoint}`);
    const res = await fetch(`https://api.igdb.com/v4/${endpoint}/webhooks/`, {
      body: `url=${`https://isaiah.moe/igdb/${endpoint}/${type}`}&secret=${config.authSecrets.jwt}&method=${type}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-ID': config.twitch.clientId,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });
    const webhook = await res.json();
    if (!Array.isArray(webhook) || !webhook[0].id) {
      logger.error(`Adding webhook ${endpoint}/${type} failed`);
      return;
    }
    logger.info(`Webhook id ${webhook[0].id} added.`);
    webhooks.push(webhook[0]);
  };

  for (const endpoint of Object.values(IgdbResources)) {
    await addWebhook(endpoint, 'create');
    await addWebhook(endpoint, 'update');
    await addWebhook(endpoint, 'delete');
    await delay(1000);
  }
};

/**
 * Sends request to unregister webhooks
 */
const removeWebhooks = async (): Promise<void> => {
  const accessToken = (await twitch.connect()).access_token;
  logger.info(`Removing webhooks`);
  for (const hook of webhooks) {
    logger.info(`Removing hook ${hook.id}`);
    await fetch(`https://api.igdb.com/v4/webhooks/${hook.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-ID': config.twitch.clientId,
      },
      method: 'DELETE',
    });
    await delay(250);
  }
};

/**
 * Gets all currently registered webhooks
 */
const getWebhooks = async (): Promise<void> => {
  const accessToken = (await twitch.connect()).access_token;
  const res = await fetch(`https://api.igdb.com/v4/webhooks/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Client-ID': config.twitch.clientId,
    },
  });
  const wh = await res.json();
  for (const hook of wh) webhooks.push(hook);
};

async function main() {
  try {
    await getWebhooks();
    await removeWebhooks();
    await addWebhooks();
  } catch (error) {
    logger.error(error);
    await removeWebhooks();
  } finally {
    process.exit(0);
  }
}

main();
