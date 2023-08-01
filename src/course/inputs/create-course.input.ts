import { InputType, PickType } from '@nestjs/graphql';
import { Course } from '../entities/course.entity';

@InputType()
export class CreateCourseInput extends PickType(
  Course,
  ['name', 'type'] as const,
  InputType,
) {}
