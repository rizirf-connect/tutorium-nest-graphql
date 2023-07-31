import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { PrismaService } from './common/services/prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TutorModule } from './tutor/tutor.module';
import { SessionModule } from './session/session.module';
import { CourseModule } from './course/course.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      buildSchemaOptions: {
        noDuplicatedFields: true,
      },
    }),
    UserModule,
    AuthModule,
    TutorModule,
    SessionModule,
    CourseModule,
    UploadModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
