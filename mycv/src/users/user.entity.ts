import {
  Entity,
  Column,
  AfterRemove,
  AfterUpdate,
  PrimaryGeneratedColumn,
  AfterInsert,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`A user with ID: ${this.id} has been inserted.`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`A user with ID: ${this.id} has been removed.`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`A user with ID: ${this.id} has been updated.`);
  }
}
