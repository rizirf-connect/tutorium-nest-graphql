import { RegisterTutorInput } from './register-tutor.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTutorInput extends PartialType(RegisterTutorInput) {
  @Field(() => Int)
  id: number;
}
