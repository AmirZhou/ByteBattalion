import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})
  name: string;

  @Column({type: 'text', nullable: true})
  description: string;
}