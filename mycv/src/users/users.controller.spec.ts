import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findOneBy: jest.fn().mockImplementation((id: number) => {
              const user = new User();
              user.email = 'email@email.com';
              user.id = id;
              user.password = 'password';
              return Promise.resolve(user);
            }),
            findBy: jest.fn().mockImplementation((email: string) => {
              const user = new User();
              user.email = email;
              user.id = 1;
              user.password = 'password';
              return Promise.resolve([user]);
            }),
          },
        },
        {
          provide: AuthService,
          useValue: {
            signIn: jest
              .fn()
              .mockImplementation((emile: string, password: string) => {
                return Promise.resolve({
                  id: 1,
                  email: emile,
                  password: password,
                } as User);
              }),
            // Add any necessary methods or properties
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    authService = module.get<AuthService>(AuthService);
  });

  describe('whoAmI', () => {
    it('should return the current user', async () => {
      const user = new User();
      const result = await controller.whoAmI(user);
      expect(result).toBe(user);
    });
  });

  describe('findAllUsers', () => {
    it('should return an array of users', async () => {
      const result = await controller.findAllUsers('email@email.com');
      expect(result[0].email).toBe('email@email.com');
    });
  });

  describe('findUser', () => {
    it('should return a user', async () => {
      const result = await controller.findUser(1);
      expect(result.id).toBe(1);
    });

    it('return null', async () => {
      usersService.findOneBy = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(null));
      expect(await controller.findUser(1)).toBe(null);
    });
  });

  describe('signIn', () => {
    const signInDto = {
      email: 'email@email.com',
      password: 'password',
    };
    const session = { userId: -10 };
    it('should return a user with a session', async () => {
      const result = await controller.signIn(signInDto, session);
      expect(result.email).toBe(signInDto.email);
      expect(session.userId).toBe(1);
    });
  });
});
