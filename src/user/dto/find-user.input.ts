import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindUserInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  email?: string;
}
