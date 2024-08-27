import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dtos';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
  {
    id: 1,
    username: 'amir',
    password: 'letmein',
  },
  {
    id: 2,
    username: 'jack',
    password: 'letmein',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser({ username, password }: AuthPayloadDto) {
    console.log('auth service triggered');
    const findUser = fakeUsers.find((user) => user.username == username);
    if (!findUser) return null;
    if (password === findUser.password) {
      const { password, ...user } = findUser; // this is how you partially extract something out of an obj
      // create a JWT and send it back to the user
      // This will create a JWT with the option passed in the module. which is
      return this.jwtService.sign(user);
    }
  }

  generateJWT() {

  }
}
