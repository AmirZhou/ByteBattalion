import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let authService: AuthService;

  const mockUsersService: Partial<UsersService> = {
    findBy: (email: string) => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password } as User), // I'm not satisfied with hard casting, how to improve?
  };

  const result =  mockUsersService.findBy('whatever');
  console.log(result);

  beforeEach(async () => {
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
    const user = await authService.signUp('test@email.com', 'test');

    expect(user.password).not.toEqual('test');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  })
});
