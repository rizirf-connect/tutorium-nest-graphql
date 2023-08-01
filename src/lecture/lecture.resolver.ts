import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LectureService } from './lecture.service';
import { Lecture } from './entities/lecture.entity';
import { FilterLectureInput } from './inputs/filter-lecture.input';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateLectureInput } from './inputs/create-lecture.input';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserRole } from 'src/user/entities/user.entity';

@Resolver(() => Lecture)
export class LectureResolver {
  constructor(private readonly lectureService: LectureService) {}

  @Query(() => [Lecture], { name: 'lectures' })
  findAllLectures(
    @Args('where', { nullable: true }) filterLectureInput: FilterLectureInput,
  ) {
    return this.lectureService.findAll(filterLectureInput);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TUTOR)
  @Mutation(() => Lecture)
  createLecture(
    @Args('data') createLectureInput: CreateLectureInput,
    @CurrentUser('userId') tutorId: string,
  ) {
    return this.lectureService.create(createLectureInput, tutorId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT)
  @Mutation(() => Lecture)
  enroll(
    @Args('data', { type: () => Int }) lectureId: number,
    @CurrentUser('userId') studentId: string,
  ) {
    return this.lectureService.enroll(lectureId, studentId);
  }
}
