import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity('ai_recommendations')
export class AIRecommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  context: string;

  @Column({ type: 'text' })
  recommendation: string;

  @Column({ type: 'boolean' })
  accepted: boolean;

  @ManyToOne(() => User, (user) => user.aiRecommendations)
  user: User;
  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
