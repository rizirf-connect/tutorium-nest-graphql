import { Injectable } from '@nestjs/common';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { FindCourseInput } from './dto/find-course.input';
import { PrismaService } from 'src/common/services/prisma.service';
import { FilterCourseInput } from './dto/filter-course.input';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCourseInput: CreateCourseInput) {
    return this.prismaService.course.create({
      data: {
        name: createCourseInput.name,
        type: createCourseInput.type,
      },
    });
  }

  findAll(filterCourseInput: FilterCourseInput) {
    return this.prismaService.course.findMany({
      where: {
        type: filterCourseInput.type,
      },
    });
  }

  findOne(findCourseInput: FindCourseInput) {
    return this.prismaService.course.findUnique({
      where: {
        id: findCourseInput.id,
      },
    });
  }

  update(id: number, updateCourseInput: UpdateCourseInput) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
