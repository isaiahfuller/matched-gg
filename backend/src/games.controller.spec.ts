// import { Test, TestingModule } from '@nestjs/testing';

// import { GamesController } from './games.controller';
// import { GameService } from './games.service';

// describe('GamesController', () => {
//   let controller: GamesController;
//   let gameService: GameService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [GamesController],
//       providers: [
//         {
//           provide: GameService,
//           useValue: {
//             getGames: jest.fn(),
//             getPreviousRecommendations: jest.fn(),
//             getTimeRecommendations: jest.fn(),
//             topGameRecommendations: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     controller = module.get<GamesController>(GamesController);
//     gameService = module.get<GameService>(GameService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('getPreviousRecommendations', () => {
//     it('should return previous recommendations for a user', async () => {
//       const mockUserId = 1;
//       const mockSession = { user: { id: mockUserId } };
//       const mockRecomendations = [{ id: 2, name: 'Recommended Game' }]; // Replace with your actual mock data structure

//       jest
//         .spyOn(gameService, 'getPreviousRecommendations')
//         .mockResolvedValue(mockRecomendations);

//       expect(await controller.getPreviousRecommendations(mockSession)).toBe(
//         mockRecomendations,
//       );
//     });
//   });

//   describe('getRecommendations', () => {
//     it('should return new recommendations for a logged-in user', async () => {
//       const mockUserId = 1;
//       const mockSession = { user: { id: mockUserId } };
//       const mockRecomendations = {
//         games: [],
//         genres: [],
//         highlights: [],
//         time: 1,
//         type: 'time',
//       };

//       jest
//         .spyOn(gameService, 'getTimeRecommendations')
//         .mockResolvedValue(mockRecomendations);

//       expect(await controller.getRecommendations(mockSession)).toBe(
//         mockRecomendations,
//       );
//     });

//     it('should return top recommendations if the user is not logged in', async () => {
//       const mockTopRecommendations = {
//         games: [],
//         genres: [],
//         highlights: [],
//         time: 1,
//         type: 'top',
//       };

//       jest
//         .spyOn(gameService, 'topGameRecommendations')
//         .mockResolvedValue(mockTopRecommendations);

//       expect(await controller.getRecommendations(null)).toBe(
//         mockTopRecommendations,
//       );
//     });
//   });
// });
