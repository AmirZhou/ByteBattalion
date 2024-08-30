import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import {
  EmailAlreadyExistsException,
  PasswordIncorrectException,
  UserNotFoundException,
} from '../exceptions';

describe('AuthService', () => {
  let authService: AuthService;
  let mockUsersService: Partial<UsersService>;
  const users: User[] = [];

  beforeEach(async () => {
    mockUsersService = {
      findBy: (email: string) => {
        const matchedUsers = users.filter((user) => user.email === email);
        return Promise.resolve(matchedUsers);
      },
      create: (email: string, password: string) => {
        const newUser = {
          id: Math.floor(Math.random() * 9999),
          email,
          password,
        } as User;
        users.push(newUser);
        return Promise.resolve(newUser);
      }, // I'm not satisfied with hard casting, how to improve?
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('careates a new user with a salted and hashed password', async () => {
    const user = await authService.signUp('email@email.com', 'test');

    expect(user.password).not.toEqual('test');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with an email that is already in use', async () => {
    await authService.signUp('test1@email.com', 'test');
    await expect(authService.signUp('test1@email.com', 'test')).rejects.toThrow(
      EmailAlreadyExistsException,
    );
  });

  it('throws if user signs in with an not existing email', async () => {
    await expect(
      authService.singIn('notexist@email.com', 'test'),
    ).rejects.toThrow(UserNotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    await authService.signUp('test3@email.com', 'test');
    await expect(
      authService.singIn('test3@email.com', 'wrongPassword'),
    ).rejects.toThrow(PasswordIncorrectException);
  });

  it('returns a user if correct password is provided', async () => {
    const password = 'test';
    const email = 'test@email.com';
    await authService.signUp(email, password);

    const user = await authService.singIn(email, password);
    expect(user).toBeDefined();

    // const user = await authService.singIn(email, password);

    // mockUsersService.findBy = (email: string) => {
    //   return Promise.resolve([{ id: 1, email, password: scrypt() } as User]);
    // };
    // const user = await authService.singIn('test@email.com', 'test');
    // expect(user).toEqual({ id: 1, email: 'test@email.com', password: 'test' });
  });
});
