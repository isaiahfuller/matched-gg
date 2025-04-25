import express from 'express';
import { mapGame } from '../map/mapGame';
import { config } from '@config/config';
import { IgdbDbController } from '../controller/IgdbDbController';
import { Games, gamesTable } from '../schema/games';
const port = 7331;

const igdbDbController = new IgdbDbController();
const app = express();
app.use(express.json());

app.post('/igdb/:endpoint/:type', async (req, res) => {
  const { endpoint, type } = req.params;
  if (type === 'delete') {
    return;
  }
  if (req.headers['x-secret'] !== config.authSecrets.jwt.replaceAll('+', ' ')) {
    console.log("secret doesn't match");
    return;
  }
  if (['create', 'update'].includes(type)) {
    switch (endpoint) {
      case 'games':
        const data = mapGame(req.body);
        console.log(data, type);
        igdbDbController.store<Games>(data, gamesTable);
        res.sendStatus(200);
    }
  } else {
    switch (endpoint) {
      case 'games':
        const data = mapGame(req.body);
        console.log(data, type);
        igdbDbController.delete<Games>(data, gamesTable);
        res.sendStatus(200);
    }
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
