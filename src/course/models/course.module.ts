import * as graphql from '@nestjs/graphql';

@graphql.ObjectType()
export class Course {
  @graphql.Field(() => graphql.Int)
  id: number;

  @graphql.Field()
  name: string;
}
