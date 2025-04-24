import express from 'express';
import { mapGame } from '../map/mapGame';
import { config } from '@config/config';
import { IgdbDbController } from '../controller/IgdbDbController';
import { Games, gamesTable } from '../schema/games';
const port = 7331;

const igdbDbController = new IgdbDbController();
const app = express();
app.use(express.json());

app.post('/igdb/games/:type', async (req, res) => {
  const type = req.params.type;
  if (type === 'delete') {
    return;
  }
  console.log(req.headers['x-secret'], config.authSecrets.jwt);
  if (req.headers['x-secret'] !== config.authSecrets.jwt.replaceAll('+', ' ')) {
    console.log("secret doesn't match");
    return;
  }
  const data = mapGame(req.body);
  console.log(data, type, req.headers);
  igdbDbController.store<Games>([data], gamesTable);
  res.status(200);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
