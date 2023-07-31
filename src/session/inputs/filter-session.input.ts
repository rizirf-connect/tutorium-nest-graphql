import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FilterSessionInput {
  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field(() => Int, { nullable: true })
  studentId?: number;
}
