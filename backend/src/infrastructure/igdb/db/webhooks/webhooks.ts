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

const publicUrl = (process.env.PUBLIC_URL || 'http://localhost:4467').replace(/\/+$/, '');
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
      body: new URLSearchParams({
        url: `${publicUrl}/igdb/${endpoint}/${type}`,
        secret: config.authSecrets.jwt,
        method: type,
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-ID': config.twitch.clientId,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });
    const response = await res.json();
    const webhook = Array.isArray(response) ? response[0] : response;
    if (!res.ok || !webhook?.id) {
      throw new Error(
        `Adding webhook ${endpoint}/${type} failed (HTTP ${res.status})`,
      );
    }
    logger.info(`Webhook id ${webhook.id} added.`);
    webhooks.push(webhook);
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
    const res = await fetch(`https://api.igdb.com/v4/webhooks/${hook.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-ID': config.twitch.clientId,
      },
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`Removing webhook ${hook.id} failed (HTTP ${res.status})`);
    }
    await delay(250);
  }
  webhooks.length = 0;
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
  if (!res.ok || !Array.isArray(wh)) {
    throw new Error(`Listing webhooks failed (HTTP ${res.status})`);
  }
  for (const hook of wh) webhooks.push(hook);
};

async function main() {
  try {
    const callbackUrl = new URL(publicUrl);
    if (['localhost', '127.0.0.1', '[::1]'].includes(callbackUrl.hostname)) {
      throw new Error('Set PUBLIC_URL to the public webhook origin before registering');
    }
    await getWebhooks();
    await removeWebhooks();
    await addWebhooks();
  } catch (error) {
    logger.error(error);
    process.exitCode = 1;
  } finally {
    twitch.stopTokenValidationInterval();
  }
}

main();
