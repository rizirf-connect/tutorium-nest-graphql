import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { SchoolScalar } from 'src/common/scalars/school.scalar';

@InputType()
export class RegisterTutorInput {
  @Field(() => String, { description: 'Tutor first name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Field(() => SchoolScalar)
  @IsNotEmpty()
  @IsString()
  school: string;
}
