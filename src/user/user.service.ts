import { Injectable } from '@nestjs/common';
import { FindUserInput } from './dto/find-user.input';
import { PrismaService } from 'src/common/services/prisma.service';
import { FilterUserInput } from './dto/filter-user.input';
import CreateStudentSession from './dto/add-student_session';

@Injectable()
export class UserService {
  constructor(readonly prismaService: PrismaService) {}

  findOne(findUserInput: FindUserInput) {
    return this.prismaService.user.findFirst({
      where: findUserInput,
    });
  }

  findAll(filterUserInput: FilterUserInput) {
    return this.prismaService.user.findMany({
      where: {
        role: filterUserInput.role,
      },
    });
  }

  createStudentSession(
    createStudentSession: CreateStudentSession,
    userId: number,
  ) {
    return this.prismaService.user.update({
      where: { id: userId },
      data: {
        sessions: {
          connect: {
            id: createStudentSession.sessionId,
          },
        },
      },
    });
  }

  findAllStudentsInSession(sessionId: number) {
    return this.prismaService.user.findMany({
      where: {
        sessions: {
          some: {
            id: sessionId,
          },
        },
      },
    });
  }
}
