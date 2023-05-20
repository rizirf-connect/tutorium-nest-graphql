import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsPositive } from 'class-validator';

@InputType()
export class UpdateExperienceInput {
  @Field(() => Int)
  @IsNumber()
  @IsPositive()
  experience: number;

  @Field(() => Int)
  @IsNumber()
  @IsPositive()
  id: number;
}
