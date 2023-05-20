import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [StudentResolver, StudentService, PrismaService],
})
export class StudentModule {}
