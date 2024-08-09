import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserNotFoundException } from 'src/exceptions';

@Injectable()
export class UsersService {
  // nestjs not so good with generic, we have to include @InjectRepository to provide additional infomation
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  async findOneBy(id: number) {
    const result = await this.repo.findOneBy({
      id: id,
    });
    return result;
  }

  async findOneByOrFail(id: number) {
    const result = await this.repo.findOneByOrFail({
      id: id,
    });
    return result;
  }

  async findBy(email: string) {
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
    const user = await this.findOneByOrFail(id);
    if (!user) {
      throw new UserNotFoundException(`User with id: ${id} is not found`);
    }
    return await this.repo.remove(user);
  }
}
