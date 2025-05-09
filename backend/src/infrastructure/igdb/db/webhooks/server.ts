import express from 'express';
import { mapGame } from '../map/mapGame';
import { config } from '@config/config';
import { IgdbDbController } from '../controller/IgdbDbController';
import {
  GameFranchises,
  gameFranchises,
  GameGameModes,
  gameGameModes,
  gameGenres,
  GameGenres,
  GameKeywords,
  gameKeywords,
  GameMultiplayerModes,
  gameMultiplayerModes,
  GamePlatforms,
  gamePlatforms,
  Games,
  gameSimilarGames,
  gamesTable,
  gameThemes,
  GameThemes,
  SimilarGames,
} from '../schema/games';
import { mapWebsite } from '../map/mapWebsite';
import { Websites, websitesTable } from '../schema/websites';
import { Artworks, artworksTable } from '../schema/artworks';
import { mapArtwork } from '../map/mapArtwork';
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
  let data;
  if (['create', 'update'].includes(type)) {
    switch (endpoint) {
      case 'games':
        data = mapGame(req.body);
        igdbDbController.store<Games>(data, gamesTable);
        const gameKeywordsRelations = processRelation(data, 'keywords');
        const gameFranchisesRelations = processRelation(data, 'franchises');
        const gamePlatformsRelations = processRelation(data, 'platforms');
        const gameGenresRelations = processRelation(data, 'genres');
        const gameThemesRelations = processRelation(data, 'themes');
        const gameMultiplayerModesRelations = processRelation(
          data,
          'multiplayerModes',
        );
        const gameGameModesRelations = processRelation(data, 'gameModes');
        const similarGames = processRelation(data, 'similarGames');
        if (gameKeywordsRelations.length) {
          igdbDbController.storeManyToMany<GameKeywords>(
            gameKeywordsRelations,
            gameKeywords,
          );
        }
        if (gameFranchisesRelations.length) {
          igdbDbController.storeManyToMany<GameFranchises>(
            gameFranchisesRelations,
            gameFranchises,
          );
        }
        if (gamePlatformsRelations.length) {
          igdbDbController.storeManyToMany<GamePlatforms>(
            gamePlatformsRelations,
            gamePlatforms,
          );
        }
        if (gameGenresRelations.length) {
          igdbDbController.storeManyToMany<GameGenres>(
            gameGenresRelations,
            gameGenres,
          );
        }
        if (gameThemesRelations.length) {
          igdbDbController.storeManyToMany<GameThemes>(
            gameThemesRelations,
            gameThemes,
          );
        }
        if (gameMultiplayerModesRelations.length) {
          igdbDbController.storeManyToMany<GameMultiplayerModes>(
            gameMultiplayerModesRelations,
            gameMultiplayerModes,
          );
        }
        if (gameGameModesRelations.length) {
          igdbDbController.storeManyToMany<GameGameModes>(
            gameGameModesRelations,
            gameGameModes,
          );
        }
        if (similarGames.length) {
          igdbDbController.storeManyToMany<SimilarGames>(
            similarGames,
            gameSimilarGames,
          );
        }
        res.sendStatus(200);
        break;
      case 'websites':
        data = mapWebsite(req.body);
        igdbDbController.store<Websites>(data, websitesTable);
        res.sendStatus(200);
        break;
      case 'artworks':
        data = mapArtwork(req.body);
        igdbDbController.store<Artworks>(data, artworksTable);
        res.sendStatus(200);
        break;
    }
  } else {
    switch (endpoint) {
      case 'games':
        data = mapGame(req.body);
        igdbDbController.delete<Games>(data, gamesTable);
        res.sendStatus(200);
        break;
      case 'websites':
        data = mapWebsite(req.body);
        igdbDbController.delete<Websites>(data, websitesTable);
        res.sendStatus(200);
        break;
      case 'artworks':
        data = mapArtwork(req.body);
        igdbDbController.delete<Artworks>(data, artworksTable);
        res.sendStatus(200);
        break;
    }
  }
});

function processRelation(data: Games, key: string) {
  if (!data[key] || !data[key].length) return [];
  const res: any = [];

  for (let e of data[key]) {
    const newEntry = { gameId: data.igdbId, resourceId: e };
    res.push(newEntry);
  }
  return res;
}

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
