import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { User } from './User';

@Entity('user-settings')
export class UserSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean' })
  notificationsEnabled: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  theme: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  language: string;

  @OneToOne(() => User, (user) => user.userSetting)
  user: User;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
