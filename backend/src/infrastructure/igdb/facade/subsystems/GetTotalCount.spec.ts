import igdb from 'igdb-api-node';
import { GetTotalCount } from './GetTotalCount';
import { Apicalypse } from 'apicalypse';

describe('GetTotalCount', () => {
  let getTotalCount: GetTotalCount;
  let client: Apicalypse;

  beforeEach(() => {
    client = igdb('test', 'test');
    getTotalCount = new GetTotalCount(client, 'games');
  });

  describe('execute', () => {
    it('should retrieve the total count of games', async () => {
      // Mock the request method of the Apicalypse client
      client.request = jest
        .fn()
        .mockResolvedValue({ status: 200, data: { count: 100 } });

      const result = await getTotalCount.execute();

      expect(result).toBe(100);
    });

    it('should throw an error if the request fails', async () => {
      // Mock the request method of the Apicalypse client to simulate a failure
      client.request = jest
        .fn()
        .mockRejectedValue(new Error('Failed to get total game count'));

      await expect(getTotalCount.execute()).rejects.toThrow(
        'Failed to get total game count',
      );
    });
  });
});
