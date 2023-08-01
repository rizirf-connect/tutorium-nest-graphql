import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from '../entities/user.entity';

@InputType()
export class FilterUserInput {
  @Field(() => UserRole)
  role: UserRole;
}
