import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

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
    const user = await this.findOneByOrFail(id);
    Object.assign(user, attrs);
    const result = await this.repo.save(user);
    // const result = await this.repo.update(id, attrs);
    return result;
  }

  async remove(id: number) {
    const user = await this.findOneByOrFail(id);
    // if (!user) {
    //   throw new Error('No such user');
    // }
    const result = await this.repo.remove(user);
    return result;
  }
}
