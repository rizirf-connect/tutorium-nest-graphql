import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { GraphqlModule } from './graphql/graphql.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [StudentModule, GraphqlModule, DatabaseModule],
})
export class AppModule {}
