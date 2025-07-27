// import { JwtService } from '@nestjs/jwt';
// import { Test, TestingModule } from '@nestjs/testing';

// import { AppController } from './app.controller';
// import { AuthService } from './auth/auth.service';
// import { LocalService } from './auth/strategies/local/local.service';
// import { UsersService } from './users/users.service';

// jest.mock('pg', () => {
//   const mockClient = {
//     connect: jest.fn(),
//     end: jest.fn(),
//     query: jest.fn(),
//   };
//   return { Client: jest.fn(() => mockClient), Pool: jest.fn(() => mockClient) };
// });

// describe('AppController', () => {
//   let appController: AppController;

//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [AppController],
//       providers: [LocalService, UsersService, JwtService, AuthService],
//     }).compile();

//     appController = app.get<AppController>(AppController);
//   });

//   describe('root', () => {
//     it('should return session', () => {
//       const mockSession = { user: { email: 'test@example.com', id: 1000 } };
//       expect(appController.getProfile(mockSession)).toStrictEqual(
//         mockSession.user,
//       );
//     });
//   });
// });
