import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { SessionService } from './services/session.service';
import { CourseService } from 'src/course/course.service';
import { Session } from './models/session.model';
import { LiveSessionService } from './services/live-session.service';
import { Role, SessionType } from '@prisma/client';
import { RecordedSessionService } from './services/recorded-session.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateLiveSessionInput } from './inputs/create-live-session.input';
import { CreateRecordedSessionInput } from './inputs/create-recorded-session.input';
import { FilterSessionInput } from './inputs/filter-session.input';
import { UserService } from 'src/user/user.service';

@Resolver(() => Session)
export class SessionResolver {
  constructor(
    private readonly sessionService: SessionService,
    private readonly courseService: CourseService,
    private readonly liveSessionService: LiveSessionService,
    private readonly recordedSessionService: RecordedSessionService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [Session], { name: 'sessions' })
  findAllSessions(
    @Args('where', { nullable: true }) filterSessionInput: FilterSessionInput,
  ) {
    return this.sessionService.findAll(filterSessionInput);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TUTOR)
  @Mutation(() => Session)
  createRecordedSession(
    @Args('data') createRecordedSessionInput: CreateRecordedSessionInput,
    @CurrentUser('userId') userId: number,
  ) {
    return this.sessionService.createRecordedSession(
      createRecordedSessionInput,
      userId,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TUTOR)
  @Mutation(() => Session)
  createLiveSession(
    @Args('data') createLiveSessionInput: CreateLiveSessionInput,
    @CurrentUser('userId') userId: number,
  ) {
    return this.sessionService.createLiveSession(
      createLiveSessionInput,
      userId,
    );
  }

  @ResolveField()
  async detail(@Parent() session: Session) {
    if (session.type === SessionType.LIVE) {
      return this.liveSessionService.findOne(session.id);
    } else {
      return this.recordedSessionService.findOne(session.id);
    }
  }

  @ResolveField()
  course(@Parent() session: Session) {
    return this.courseService.findOne({ id: session.courseId });
  }

  @ResolveField()
  students(@Parent() session: Session) {
    return this.userService.findAllStudentsInSession(session.id);
  }
}
