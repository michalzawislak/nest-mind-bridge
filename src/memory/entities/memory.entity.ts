import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Memory {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    default: '',
  })
  content: string;

  @Column({
    default: '',
  })
  type: string;

  @Column({
    default: '',
  })
  source: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    default: false,
  })
  synced: boolean;

  @Column({
    default: false,
  })
  update: boolean;
}