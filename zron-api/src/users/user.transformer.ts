import { Exclude } from 'class-transformer';
import { User } from './user.entity';

export class UserTransformer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  updatedAt: Date;
  createdAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
