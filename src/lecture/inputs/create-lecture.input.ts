import { InputType, PickType, Int, Field } from '@nestjs/graphql';
import { Lecture } from '../entities/lecture.entity';

@InputType()
export class CreateLectureInput extends PickType(
  Lecture,
  ['duration', 'startAt', 'url'],
  InputType,
) {
  @Field(() => Int)
  courseId: number;
}
