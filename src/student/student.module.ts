import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { studentProviders } from './student.providers';

@Module({
  imports: [DatabaseModule],
  providers: [StudentResolver, StudentService, ...studentProviders],
})
export class StudentModule {}
