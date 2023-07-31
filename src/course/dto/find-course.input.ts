import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindCourseInput {
  @Field(() => Int)
  id: number;
}
