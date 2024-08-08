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

  async findOne(id: number) {
    const result = await this.repo.findOneBy({
      id: id,
    });
    return result;
  }

  async findOneOrFail(id: number) {
    const result = await this.repo.findOneByOrFail({
      id: id,
    });
    return result;
  }

  async find() {
    const result = await this.repo.find();
    return result;
  }

  async update(id: number, update: any) {
    const result = await this.repo.update(id, update);
    return result;
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);
    return result;
  }
}
