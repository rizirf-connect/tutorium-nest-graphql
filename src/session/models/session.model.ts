import {
  Field,
  HideField,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { SessionType } from '@prisma/client';
import { Course } from 'src/course/models/course.model';
import { SessionUnion } from '../unions/session.union';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Session {
  @Field(() => Int)
  readonly id: number;

  @Field(() => Int)
  readonly courseId: number;

  @Field(() => SessionType)
  readonly type: SessionType;

  @Field(() => Course)
  readonly course: Course;

  @Field(() => SessionUnion, { nullable: true })
  readonly detail?: typeof SessionUnion;

  @Field(() => [User], { nullable: true })
  students: [User];
}

registerEnumType(SessionType, {
  name: 'SessionType',
});
