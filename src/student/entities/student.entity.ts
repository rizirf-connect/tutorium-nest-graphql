import { ObjectType, Field } from '@nestjs/graphql';
import { SchoolScalar } from 'src/common/scalars/school.scalar';

@ObjectType()
export class Student {
  @Field()
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field(() => SchoolScalar)
  school: string;
}
