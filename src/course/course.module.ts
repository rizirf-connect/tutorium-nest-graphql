import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  providers: [CourseResolver, CourseService, PrismaService],
  exports: [CourseService],
})
export class CourseModule {}
