import { Injectable } from '@nestjs/common';
import { DataSource, Equal, In, IsNull, Not, Repository } from 'typeorm';
import { Lecture } from './entities/lecture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLectureInput } from './inputs/create-lecture.input';
import { CourseService } from 'src/course/course.service';
import { UserService } from 'src/user/user.service';
import { FilterLectureInput } from './inputs/filter-lecture.input';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture) private readonly lectures: Repository<Lecture>,
    private readonly courseService: CourseService,
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createLectureInput: CreateLectureInput, tutorId: string) {
    const course = await this.courseService.findOne(
      createLectureInput.courseId,
    );

    const tutor = await this.userService.findOne({ id: tutorId });

    return this.lectures.save({
      ...createLectureInput,
      course,
      tutor,
    });
  }

  async findAll(filterLectureInput: FilterLectureInput) {
    const lectures = await this.lectures.find({
      where: {
        tutor: {
          id: filterLectureInput?.tutorId,
        },
        students: {
          id: filterLectureInput.studentId,
        },
      },
    });

    return lectures;
  }

  async enroll(lectureId: number, studentId: string) {
    const lecture = await this.lectures.findOneByOrFail({
      id: lectureId,
    });

    const student = await this.userService.findOne({ id: studentId });

    lecture.students.push(student);
    return this.lectures.save(lecture);
  }
}
