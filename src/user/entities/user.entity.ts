import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/base/base.entity';
import { Task } from 'src/task/entities/task.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  @Exclude()
  password: string;

  @Column()
  fullName: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
