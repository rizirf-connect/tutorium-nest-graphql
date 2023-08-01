import { Injectable } from '@nestjs/common';
import { CreateCourseInput } from './inputs/create-course.input';
import { FilterCourseInput } from './inputs/filter-course.input';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private readonly courses: Repository<Course>,
  ) {}

  create(createCourseInput: CreateCourseInput) {
    return this.courses.save({ ...createCourseInput });
  }

  findAll(filterCourseInput: FilterCourseInput) {
    return this.courses.findBy({ ...filterCourseInput });
  }

  findOne(id: number) {
    return this.courses.findOneByOrFail({ id });
  }
}
