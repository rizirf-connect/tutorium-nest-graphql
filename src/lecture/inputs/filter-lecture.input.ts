import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterLectureInput {
  @Field({ nullable: true })
  tutorId?: string;

  @Field({ nullable: true })
  studentId?: string;

  @Field({ defaultValue: false })
  includeEnrolledLectures?: boolean;
}
