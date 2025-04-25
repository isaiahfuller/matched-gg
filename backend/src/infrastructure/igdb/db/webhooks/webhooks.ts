import TwitchHandler from 'src/infrastructure/twitch/handlers/twitchHandler';
import { IgdbDbController } from '../controller/IgdbDbController';
import { config } from '@config/config';
import logger from '@util/logger';
import { IgdbConfig } from '@config/interfaces';
import { IgdbFacade } from '../../facade/igdbFacade';
import { IgdbWebhook } from '../../facade/interfaces';

const igdbDbController = new IgdbDbController();

const twitch = new TwitchHandler(
  {
    apiUrl: config.twitch.apiUrl,
    clientId: config.twitch.clientId,
    clientSecret: config.twitch.clientSecret,
  },
  logger,
);

const webhooks: IgdbWebhook[] = [];

const addWebhooks = async (): Promise<void> => {
  const accessToken = (await twitch.connect()).access_token;
  const getWebhooks = async (): Promise<void> => {
    const res = await fetch(`https://api.igdb.com/v4/webhooks/`, {
      headers: {
        'Client-ID': config.twitch.clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const addWebhook = async (
    endpoint: string,
    type: 'create' | 'update' | 'delete',
  ) => {
    logger.info(`Adding webhook ${type} for endpoint ${endpoint}`);
    const res = await fetch(`https://api.igdb.com/v4/${endpoint}/webhooks/`, {
      method: 'POST',
      headers: {
        'Client-ID': config.twitch.clientId,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `url=${`https://isaiah.moe/igdb/${endpoint}/${type}`}&secret=${config.authSecrets.jwt}&method=${type}`,
    });
    const webhook = await res.json();
    if (!Array.isArray(webhook) || !webhook[0].id) {
      logger.error(`Adding webhook ${endpoint}/${type} failed`);
      return;
    }
    logger.info(`Webhook id ${webhook[0].id} added.`);
    webhooks.push(webhook[0]);
  };

  await addWebhook('games', 'create');
  await addWebhook('games', 'update');
  await addWebhook('games', 'delete');

  //Testing
  const testData = await fetch(
    `https://api.igdb.com/v4/games/webhooks/test/${123499}?entityId=${81899}`,
    {
      method: 'POST',
      headers: {
        'Client-ID': config.twitch.clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};

const removeWebhooks = async (): Promise<void> => {
  const accessToken = (await twitch.connect()).access_token;
  logger.info(`Removing webhooks`);
  for (const hook of webhooks) {
    logger.info(`Removing hook ${hook.id}`);
    const res = await fetch(`https://api.igdb.com/v4/webhooks/${hook.id}`, {
      method: 'DELETE',
      headers: {
        'Client-ID': config.twitch.clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
};

const getWebhooks = async (): Promise<void> => {
  const accessToken = (await twitch.connect()).access_token;
  const res = await fetch(`https://api.igdb.com/v4/webhooks/`, {
    headers: {
      'Client-ID': config.twitch.clientId,
      Authorization: `Bearer ${accessToken}`,
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
    process.exit(0);
  } catch (error) {
    logger.error(error);
    await removeWebhooks();
  }
}

// process.on('SIGINT', async () => {
//   await removeWebhooks();
//   process.exit(0);
// });
// process.on('SIGQUIT', async () => {
//   await removeWebhooks();
//   process.exit(0);
// });
// process.on('SIGTERM', async () => {
//   await removeWebhooks();
//   process.exit(0);
// });

main();
