import { InputType, PickType } from '@nestjs/graphql';
import { Course } from '../models/course.model';

@InputType()
export class CreateCourseInput extends PickType(
  Course,
  ['name', 'type'] as const,
  InputType,
) {}
