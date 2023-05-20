import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SchoolScalar } from 'src/common/scalars/school.scalar';

@ObjectType()
export class Tutor {
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

  @Field({ nullable: true })
  profileUrl?: string;

  @Field(() => Int, { nullable: true })
  experience?: number;
}
