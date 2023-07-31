import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class AuthCredentialsInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
