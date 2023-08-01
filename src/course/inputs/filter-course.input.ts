import { Field, InputType } from '@nestjs/graphql';
import { CourseType } from '../entities/course.entity';

@InputType()
export class FilterCourseInput {
  @Field(() => CourseType)
  type: CourseType;
}
