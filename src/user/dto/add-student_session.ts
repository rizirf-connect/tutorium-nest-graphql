import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export default class CreateStudentSession {
  @Field(() => Int)
  sessionId: number;
}
