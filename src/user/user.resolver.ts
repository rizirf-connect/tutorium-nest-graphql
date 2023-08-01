import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserRole } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { FilterUserInput } from './inputs/filter-user.input';
import { LectureService } from 'src/lecture/lecture.service';
import { CreateUserInput } from './inputs/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly lectureService: LectureService,
  ) {}

  @Query(() => [User], { name: 'users' })
  findAll(@Args('where', { nullable: true }) input: FilterUserInput) {
    return this.userService.findAll(input);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TUTOR, UserRole.STUDENT)
  @Query(() => User, { name: 'me' })
  me(@CurrentUser('userId') userId: string) {
    return this.userService.findOne({ id: userId });
  }

  @Mutation(() => User, { name: 'register' })
  registerUser(@Args('data') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @ResolveField()
  lectures(@Parent() user: User) {
    if (user.role === UserRole.STUDENT) {
      return this.lectureService.findAll({ studentId: user.id });
    } else {
      return this.lectureService.findAll({ tutorId: user.id });
    }
  }
}
