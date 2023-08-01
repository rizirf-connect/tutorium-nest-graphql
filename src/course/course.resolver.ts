import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { CreateCourseInput } from './inputs/create-course.input';
import { FilterCourseInput } from './inputs/filter-course.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { UserRole } from 'src/user/entities/user.entity';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Mutation(() => Course)
  createCourse(@Args('data') createCourseInput: CreateCourseInput) {
    return this.courseService.create(createCourseInput);
  }

  @Query(() => [Course], { name: 'courses' })
  findAll(
    @Args('where', { nullable: true }) filterCourseInput: FilterCourseInput,
  ) {
    return this.courseService.findAll(filterCourseInput);
  }

  @Query(() => Course, { name: 'course' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.courseService.findOne(id);
  }
}
