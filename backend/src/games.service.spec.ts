// import { Test, TestingModule } from '@nestjs/testing';

// import { GameService } from './games.service';

// // Mock any dependencies if there are any
// describe('GameService', () => {
//   let service: GameService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [GameService],
//     }).compile();

//     service = module.get<GameService>(GameService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   // Example test case for recommendationDb method
//   describe('recommendationDb', () => {
//     it('should return game recommendations', async () => {
//       const excludedIds = new Set<number>();
//       const genreIds = new Set<number>([1, 2]);
//       const themeIds = new Set<number>([3]);

//       // Assuming we have a known good result for the test
//       const expectedResult = [
//         { game: {}, type: 'tag', typeText: 'Some Genre' },
//       ];

//       jest.spyOn(service, 'recommendationDb').mockResolvedValue(expectedResult);

//       const result = await service.recommendationDb(
//         excludedIds,
//         genreIds,
//         themeIds,
//       );

//       expect(result).toEqual(expectedResult);
//     });
//   });

//   // Example test case for topGameRecommendations method
//   describe('topGameRecommendations', () => {
//     it('should return top game recommendations', async () => {
//       const expectedResult = {
//         games: [{ game: {}, type: 'top', typeText: null }],
//         genres: [1, 2],
//         highlights: [],
//         time: 0,
//         type: 'top',
//       };

//       jest
//         .spyOn(service, 'topGameRecommendations')
//         .mockResolvedValue(expectedResult);

//       const result = await service.topGameRecommendations();

//       expect(result).toEqual(expectedResult);
//     });
//   });
// });
