import { Field, InputType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(
  User,
  ['firstName', 'lastName', 'email', 'role'] as const,
  InputType,
) {
  @Field()
  password: string;
}
