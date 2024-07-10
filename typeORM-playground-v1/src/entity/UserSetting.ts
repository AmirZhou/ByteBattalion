import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
