import { ObjectType, Int, Field } from '@nestjs/graphql';
import { Course } from 'src/course/entities/course.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'lectures' })
@ObjectType()
export class Lecture {
  @PrimaryGeneratedColumn({ name: 'lecture_id' })
  @Field(() => Int)
  id: number;

  @Column({ type: 'timestamp', name: 'start_at' })
  @Field()
  startAt: Date;

  @Column()
  @Field(() => Int)
  duration: number;

  @Column()
  @Field()
  url: string;

  @ManyToOne(() => Course, (course) => course.lectures, { eager: true })
  @JoinColumn({ name: 'course_id' })
  @Field(() => Course, { nullable: true })
  course: Course;

  @ManyToOne(() => User, (user) => user.tutorLectures, { eager: true })
  @JoinColumn({ name: 'tutor_id' })
  @Field(() => User, { nullable: true })
  tutor: User;

  @ManyToMany(() => User, (user) => user.studentLectures, { eager: true })
  @JoinTable()
  @Field(() => [User], { nullable: true })
  students: User[];
}
