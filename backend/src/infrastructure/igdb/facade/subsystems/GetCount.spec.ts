import igdb from 'igdb-api-node';
import { GetCount } from './GetCount';
import { Apicalypse } from 'apicalypse';
import { IgdbResources } from './enums/IgdbResources';

describe('GetCount', () => {
  let getCount: GetCount;
  let client: Apicalypse;

  beforeEach(() => {
    client = igdb('test', 'test');
    getCount = new GetCount(client);
  });

  describe('execute', () => {
    it('should retrieve the total count of games', async () => {
      // Mock the request method of the Apicalypse client
      client.request = jest
        .fn()
        .mockResolvedValue({ data: { count: 100 }, status: 200 });

      const result = await getCount.execute(IgdbResources.GAMES);

      expect(result.count).toBe(100);
    });

    it('should throw an error if the request fails', async () => {
      // Mock the request method of the Apicalypse client to simulate a failure
      client.request = jest
        .fn()
        .mockRejectedValue(new Error('Failed to get total games count'));

      await expect(getCount.execute(IgdbResources.GAMES)).rejects.toThrow(
        'Failed to get total games count',
      );
    });
  });
});
