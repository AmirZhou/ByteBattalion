import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserNotFoundException } from 'src/exceptions';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class UsersService {
  // nestjs not so good with generic, we have to include @InjectRepository to provide additional infomation
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private notification: NotificationsService,
  ) {}

  async create(email: string, password: string): Promise<User> {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  async findOneBy(id: number): Promise<User> {
    const user = await this.repo.findOneBy({
      id: id,
    });
    if (!user) {
      // next line tests the observable, not relavent to the main function
      this.notification.getNotifications().subscribe((message) => {
        console.log(message);
      });
      throw new UserNotFoundException(`User with id: ${id} is not found`);
    }
    return user;
  }

  // async findOneByOrFail(id: number) {
  //   const result = await this.repo.findOneByOrFail({
  //     id: id,
  //   });
  //   return result;
  // }

  async findBy(email: string): Promise<User[]> {
    const result = await this.repo.findBy({
      email: email,
    });
    return result;
  }

  //insert and update are made to deal with plain objects
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOneBy(id);
    if (!user) {
      throw new UserNotFoundException(`User with id: ${id} is not found`);
    }
    Object.assign(user, attrs);
    const result = await this.repo.save(user);
    return result;
  }

  async remove(id: number) {
    const user = await this.findOneBy(id);
    if (!user) {
      throw new UserNotFoundException(`User with id: ${id} is not found`);
    }
    return await this.repo.remove(user);
  }
}
