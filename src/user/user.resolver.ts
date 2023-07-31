import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { FindUserInput } from './dto/find-user.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { SessionService } from 'src/session/services/session.service';
import { FilterUserInput } from './dto/filter-user.input';
import CreateStudentSession from './dto/add-student_session';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  @Query(() => [User], { name: 'users' })
  findAll(@Args('where') input: FilterUserInput) {
    return this.userService.findAll(input);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Query(() => User, { name: 'user' })
  findOne(@Args('where') input: FindUserInput) {
    return this.userService.findOne(input);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TUTOR, Role.STUDENT)
  @Query(() => User, { name: 'me' })
  me(@CurrentUser('userId') userId: number) {
    return this.userService.findOne({ id: userId });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.STUDENT)
  @Mutation(() => User)
  enrollStudent(
    @Args('data') createStudentSession: CreateStudentSession,
    @CurrentUser('userId') userId: number,
  ) {
    return this.userService.createStudentSession(
      {
        sessionId: createStudentSession.sessionId,
      },
      userId,
    );
  }

  @ResolveField()
  sessions(@Parent() user: User) {
    return this.sessionService.findAll({ userId: user.id });
  }
}
