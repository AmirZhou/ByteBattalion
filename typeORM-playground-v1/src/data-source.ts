import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { UserSetting } from './entity/UserSetting';
import { Progress } from './entity/Progress';
import { Priority } from './entity/Priority';
import { Notification } from './entity/Notification';
import { Milestone } from './entity/Milestone';
import { AIRecommendation } from './entity/AIRecommendation';
import { Task } from './entity/Task';
import { Tag } from './entity/Tag';
import { Goal } from './entity/Goal';
import { Category } from './entity/Category';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: '693721',
  database: 'typeORM-playground-v1',
  synchronize: true,
  logging: false,
  entities: [
    User,
    UserSetting,
    Task,
    Tag,
    Progress,
    Priority,
    Notification,
    Milestone,
    Goal,
    Category,
    AIRecommendation,
  ],
  migrations: [],
  subscribers: [],
});
