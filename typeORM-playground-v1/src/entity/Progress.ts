import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity('Progresses')
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  percentage: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(()=>User, user => user.progresses)  
  user: User;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
