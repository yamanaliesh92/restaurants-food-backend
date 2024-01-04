import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Base } from 'y/lib/base.entity';

interface UserData {
  email: string;
  password: string;
  username: string;
}

@Entity('user')
export class UserEntity extends Base {
  // @PrimaryGeneratedColumn('increment')
  // id: number;

  // @CreateDateColumn({ type: 'timestamptz' })
  // cratedAt: Date;

  // @UpdateDateColumn({ type: 'timestamptz' })
  // updatedAt: Date;

  @Column({ unique: true, type: 'text' })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text' })
  username: string;

  constructor(data: UserData) {
    super();
    if (data) {
      this.email = data.email;
      this.password = data.password;
      this.username = data.username;
    }
  }
}
