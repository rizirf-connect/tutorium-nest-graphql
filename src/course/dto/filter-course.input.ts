import { Field, InputType } from '@nestjs/graphql';
import { CourseType } from '@prisma/client';

@InputType()
export class FilterCourseInput {
  @Field(() => CourseType)
  type: CourseType;
}
