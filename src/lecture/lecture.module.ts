import { Module, forwardRef } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureResolver } from './lecture.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { UserModule } from 'src/user/user.module';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lecture]),
    CourseModule,
    forwardRef(() => UserModule),
  ],
  providers: [LectureResolver, LectureService],
  exports: [LectureService],
})
export class LectureModule {}
