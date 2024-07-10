import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Progresses')
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  percentage: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
