// import igdb from 'igdb-api-node';
// import { Game } from '../entities/Game';
// import { Apicalypse } from 'apicalypse';

// export class GamesAdapter {
//   private client: Apicalypse;

//   constructor(apiKey: string) {
//     this.client = igdb(apiKey);
//   }

//   async getGames(): Promise<Game[]> {
//     const response = await this.client.games({
//       fields: 'name, summary, rating',
//       limit: 10,
//       sort: 'rating desc',
//       where: 'rating > 0',
//     });

//     return response.body.map((game) => ({
//       name: game.name,
//       summary: game.summary,
//       rating: game.rating,
//     }));
//   }
// }

// export default GamesAdapter;
