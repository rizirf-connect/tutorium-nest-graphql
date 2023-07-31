import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LiveSession {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  startAt: Date;

  @Field(() => Int)
  duration: number;

  @Field()
  url: string;
}
