import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: 'ADMIN' | 'SDE' | 'INTERN';
// }

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Amir Zhou',
      email: 'amirzhou@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Amir Zhou2',
      email: 'amirzhou2@gmail.com',
      role: 'SDE',
    },
    {
      id: 3,
      name: 'Amir Zhou3',
      email: 'amirzhou3@gmail.com',
      role: 'SDE',
    },
    {
      id: 4,
      name: 'Amir Zhou4',
      email: 'amirzhou4@gmail.com',
      role: 'INTERN',
    },
    {
      id: 5,
      name: 'Amir Zhou5',
      email: 'amirzhou5@gmail.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'SDE' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => {
        return user.role === role;
      });
    }
    return this.users;
  }

  findById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return user;
    }
  }

  create(user: CreateUserDto) {
    const usersByHeightId = [...this.users].sort((a, b) => {
      return b.id - a.id;
    });
    const newUser = { id: usersByHeightId[0].id + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findById(id);
  }

  delete(id: number) {
    const removedUser = this.findById(id);
    if (removedUser) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return removedUser;
  }
}
