import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Lecture } from 'src/lecture/entities/lecture.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';

export enum CourseType {
  VCE = 'vce',
  IB = 'ib',
}

@Entity({ name: 'courses' })
@ObjectType()
export class Course {
  @PrimaryGeneratedColumn({ name: 'course_id' })
  @Field(() => Int)
  id: number;

  @Column({ name: 'course_name' })
  @Field()
  name: string;

  @Column({ name: 'course_type', type: 'enum', enum: CourseType })
  @Field(() => CourseType)
  type: CourseType;

  @OneToMany(() => Lecture, (lecture) => lecture.course)
  lectures: Lecture[];
}

registerEnumType(CourseType, {
  name: 'CourseType',
  description: 'The supported course types.',
});
