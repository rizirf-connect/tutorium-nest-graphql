import { Module, forwardRef } from '@nestjs/common';
import { SessionService } from './services/session.service';
import { SessionResolver } from './session.resolver';
import { PrismaService } from 'src/common/services/prisma.service';
import { CourseModule } from 'src/course/course.module';
import { LiveSessionService } from './services/live-session.service';
import { RecordedSessionService } from './services/recorded-session.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [CourseModule, forwardRef(() => UserModule)],
  providers: [
    SessionResolver,
    SessionService,
    LiveSessionService,
    RecordedSessionService,
    PrismaService,
  ],
  exports: [SessionService],
})
export class SessionModule {}
