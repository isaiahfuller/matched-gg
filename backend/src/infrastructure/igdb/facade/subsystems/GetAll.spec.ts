import igdb from 'igdb-api-node';
import { GetAll } from './GetAll';
import { Apicalypse } from 'apicalypse';
import { IgdbResources } from './enums/IgdbResources';
import { GameDTO } from './DTO/GameDTO';

describe('GetAll', () => {
  let getAll: GetAll;
  let client: Apicalypse;

  beforeEach(() => {
    client = igdb('test', 'test');
    getAll = new GetAll({ accessToken: 'test', clientId: 'test' });
    getAll.client = client;
    getAll.setInterceptorClient = jest.fn();
  });

  describe('execute', () => {
    it('should retrieve all games with concurrency', async () => {
      client.requestAll = jest.fn().mockResolvedValue([
        { id: 1, name: 'Game 1' },
        { id: 2, name: 'Game 2' },
      ]);

      const result = await getAll.execute<GameDTO>(
        { concurrency: 2 },
        10,
        IgdbResources.GAMES,
        true,
        2,
      );

      expect(result).toEqual([
        { id: 1, name: 'Game 1' },
        { id: 2, name: 'Game 2' },
      ]);
    });

    it('should retrieve all games with delay', async () => {
      client.requestAll = jest.fn().mockResolvedValue([
        { id: 1, name: 'Game 1' },
        { id: 2, name: 'Game 2' },
      ]);

      const result = await getAll.execute<GameDTO>(
        { delay: 1000 },
        10,
        IgdbResources.GAMES,
        true,
        2,
      );

      expect(result).toEqual([
        { id: 1, name: 'Game 1' },
        { id: 2, name: 'Game 2' },
      ]);
    });

    it('should retrieve all games with expanded fields', async () => {
      // Mock the requestAll method of the Apicalypse client
      client.requestAll = jest
        .fn()
        .mockResolvedValue([
          { id: 1, name: 'Game 1', genre: { id: 1, name: 'Genre 1' } },
        ]);

      const result = await getAll.execute<GameDTO>(
        {},
        10,
        IgdbResources.GAMES,
        true,
        1,
      );

      expect(result).toEqual([
        { id: 1, name: 'Game 1', genre: { id: 1, name: 'Genre 1' } },
      ]);
    });

    it('should retrieve all games with non-expanded fields', async () => {
      // Mock the requestAll method of the Apicalypse client
      client.requestAll = jest
        .fn()
        .mockResolvedValue([{ id: 1, name: 'Game 1', genre: 1 }]);

      const result = await getAll.execute<GameDTO>(
        {},
        10,
        IgdbResources.GAMES,
        false,
        1,
      );

      expect(result).toEqual([{ id: 1, name: 'Game 1', genre: 1 }]);
    });

    it('should throw an error if the request fails', async () => {
      client.requestAll = jest
        .fn()
        .mockRejectedValue(new Error('Failed to get all games'));

      await expect(
        getAll.execute<GameDTO>({}, 10, IgdbResources.GAMES, true, 100),
      ).rejects.toThrow('Failed to get all games');
    });
  });
});
