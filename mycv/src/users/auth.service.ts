import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  EmailAlreadyExistsException,
  UserNotFoundException,
  PasswordIncorrectException,
} from 'src/exceptions';
import { randomBytes, scrypt as _scrypt, BinaryLike } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';

const scrypt = promisify<BinaryLike, BinaryLike, number, Buffer>(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async singIn(email: string, password: string) {
    // find the user
    const users = await this.usersService.findBy(email);
    if (users.length == 0) {
      throw new UserNotFoundException();
    }

    // get the hashed and salted pwd
    const user = users[0];
    const pwd = user.password;

    // extract the salt
    const [salt, storedHash] = pwd.split('.');

    // hash the hash = salt.password
    const hash = await scrypt(password, salt, 32);

    // check if hash == pwd
    if (hash.toString('hex') != storedHash) {
      throw new PasswordIncorrectException();
    }
    return user;
    // true : send a cookie, else throw an custom error

    // question: what promise does this going to return
  }

  async signUp(email: string, password: string): Promise<User> {
    // check email availability
    const user = await this.usersService.findBy(email);
    if (user.length !== 0) {
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
