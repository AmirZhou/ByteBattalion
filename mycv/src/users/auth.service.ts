import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { EmailAlreadyExistsException } from 'src/exceptions';
import { randomBytes, scrypt as _scrypt, BinaryLike } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';

const scrypt = promisify<BinaryLike, BinaryLike, number, Buffer>(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  singIn(email: string, password: string) {}

  async signUp(email: string, password: string): Promise<User> {
    // check email availability
    const user = await this.usersService.findBy(email);
    if (user.length !== 0) {
      console.log('about to throw');
      throw new EmailAlreadyExistsException('Email already exists');
    }
    // Generate a salt
    const salt = randomBytes(8).toString('hex'); // This returns a Buffer, that's an object that deals with binary, a buffer for holding and manipulating binary data in memory.

    // Hash the password and the salt TOGETHER

    // This is the callback version, I'll have to handle the err directly in the callback
    // let hasedPasswordWithoutPromise = '';
    // _scrypt(password, salt, 32, (err, value) => {
    //   if (err) {
    //     throw err;
    //   }
    //   hasedPasswordWithoutPromise = value.toString('hex');
    // });
    const hash = await scrypt(password, salt, 32);
    // Join the hased result and the salt TOGETHER

    const hashedAndSaltedPwd = salt + '.' + hash.toString('hex');

    // Create a new user
    const newUser = await this.usersService.create(email, hashedAndSaltedPwd);
    // return the user

    return newUser;
  }
}
