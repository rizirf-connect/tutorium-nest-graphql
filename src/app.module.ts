import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { GraphqlModule } from './graphql/graphql.module';
import { TutorModule } from './tutor/tutor.module';
import { PrismaService } from './prisma.service';
import 'reflect-metadata';
import { GraphqlExceptionFilter } from './common/filters/graphql-exception.filter';
import { ConfigurationModule } from './configuration/configuration.module';
import { SchoolScalar } from './common/scalars/school.scalar';

@Module({
  imports: [StudentModule, GraphqlModule, TutorModule, ConfigurationModule],
  providers: [PrismaService, GraphqlExceptionFilter, SchoolScalar],
})
export class AppModule {}
