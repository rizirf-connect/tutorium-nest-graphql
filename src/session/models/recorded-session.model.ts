import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RecordedSession {
  @Field(() => Int)
  id: number;

  @Field(() => Float)
  price: number;
}
