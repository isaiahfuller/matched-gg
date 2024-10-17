// import UserHandler from './userHandler';

// describe('UserHandler', () => {
//   let userHandler;

//   beforeEach(() => {
//     userHandler = new UserHandler();
//   });

//   it('should add a user', async () => {
//     const res = await userHandler.addNewUser(
//       'Test',
//       'email@email.com',
//       'password',
//     );
//     expect(res).toEqual([
//       {
//         email: 'email@email.com',
//         name: 'Test',
//         password: 'password',
//       },
//     ]);
//   });
//   it('should update a user', async () => {
//     const res = await userHandler.updateUser({ password: 'wordpass' });
//     expect(res).toEqual([
//       {
//         email: 'email@email.com',
//         name: 'Test',
//         password: 'password',
//       },
//     ]);
//   });
//   it('should delete a user', async () => {
//     const res = await userHandler.deleteUser('email@email.com');
//     expect(res).toEqual([
//       {
//         email: 'email@email.com',
//         name: 'Test',
//         password: 'password',
//       },
//     ]);
//   });
// });
