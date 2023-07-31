import { Field, InputType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@InputType()
export class FilterUserInput {
  @Field(() => Role)
  role: Role;
}
