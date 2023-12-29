import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

interface UserData {
  email: string;
  password: string;
  username: string;
  img: string;
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  cratedAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text' })
  username: string;

  @Column({ type: 'text', nullable: true })
  img: string;

  constructor(data: UserData) {
    if (data) {
      this.email = data.email;
      this.img = data.img;
      this.password = data.password;
      this.username = data.username;
    }
  }
}
