import {
  Entity,
  Column,
  AfterRemove,
  AfterUpdate,
  PrimaryGeneratedColumn,
  AfterInsert,
  OneToMany,
} from 'typeorm';
import { Report } from 'src/reports/report.entity';

@Entity()
export class User {
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isAdmin: boolean;

  @Column()
  email: string;

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
