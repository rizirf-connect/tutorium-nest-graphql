import {
  ObjectType,
  Field,
  registerEnumType,
  HideField,
} from '@nestjs/graphql';
import { Lecture } from 'src/lecture/entities/lecture.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  TUTOR = 'tutor',
}

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id',
  })
  @Field()
  id: string;

  @Column({ name: 'first_name' })
  @Field()
  firstName: string;

  @Column({ name: 'last_name' })
  @Field()
  lastName: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', name: 'user_role', enum: UserRole })
  @Field(() => UserRole)
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Lecture, (lecture) => lecture.tutor)
  tutorLectures: Lecture[];

  @ManyToMany(() => Lecture, (lecture) => lecture.students)
  studentLectures: Lecture[];

  @Field(() => [Lecture], { nullable: true })
  lectures: Lecture[];
}

registerEnumType(UserRole, {
  name: 'UserRoles',
  description: 'The supported user roles.',
});
