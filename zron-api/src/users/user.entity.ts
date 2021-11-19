import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 35, name: 'first_name', nullable: false, type: 'varchar' })
  firstName: string;

  @Column({ length: 35, name: 'last_name', nullable: false, type: 'varchar' })
  lastName: string;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
