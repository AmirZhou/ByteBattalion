import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { EmailAlreadyExistsException } from 'src/exceptions';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  singIn(email: string, password: string) {}

  async singUp(email: string, password: string) {
    // check email availability
    const user = await this.usersService.findBy(email);
    if (user.length !== 0) {
      throw new EmailAlreadyExistsException();
    }
    // Hash the users password

    // Create a new user

    // return the user
  }
}
