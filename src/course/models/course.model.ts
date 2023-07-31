import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { CourseType } from '@prisma/client';

@ObjectType()
export class Course {
  @Field(() => Int)
  id: number;

  @Field()
  readonly name: string;

  @Field(() => CourseType)
  readonly type: CourseType;
}

registerEnumType(CourseType, {
  name: 'CourseType',
});
