import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { Goal } from './Goal';
import { Task } from './Task';
import { Progress } from './Progress';
import { UserSetting } from './UserSetting';
import { Tag } from './Tag';
import { Notification } from './Notification';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToOne(() => UserSetting, (userSetting) => userSetting.user)
  userSetting: UserSetting;

  @OneToMany(() => Goal, (goal) => goal.user)
  goals: Goal[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => Progress, (progress) => progress.user)
  progresses: Progress[];

  @OneToMany(()=>Notification, notification => notification.user)
  notifications: Notification[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
