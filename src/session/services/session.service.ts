import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateLiveSessionInput } from '../inputs/create-live-session.input';
import { CreateRecordedSessionInput } from '../inputs/create-recorded-session.input';
import { SessionType } from '@prisma/client';
import { FilterSessionInput } from '../inputs/filter-session.input';

@Injectable()
export class SessionService {
  constructor(private readonly prismaService: PrismaService) {}

  createLiveSession(
    createLiveSessionInput: CreateLiveSessionInput,
    userId: number,
  ) {
    return this.prismaService.session.create({
      data: {
        course: { connect: { id: createLiveSessionInput.courseId } },
        user: { connect: { id: userId } },
        liveSession: {
          create: {
            duration: createLiveSessionInput.duration,
            startAt: createLiveSessionInput.startAt,
            url: createLiveSessionInput.url,
          },
        },
      },
    });
  }

  createRecordedSession(
    createRecordedSessionInput: CreateRecordedSessionInput,
    userId: number,
  ) {
    return this.prismaService.session.create({
      data: {
        course: { connect: { id: createRecordedSessionInput.courseId } },
        user: { connect: { id: userId } },
        type: SessionType.RECORDED,
        recordedSession: {
          create: {
            price: createRecordedSessionInput.price,
          },
        },
      },
    });
  }

  async findAll(filterSessionInput: FilterSessionInput) {
    const tutorSessions = await this.prismaService.session.findMany({
      where: {
        OR: [
          {
            createdBy: filterSessionInput.userId,
          },
          {
            students: {
              some: {
                id: filterSessionInput.userId,
              },
            },
          },
        ],
      },
    });
    return tutorSessions;
  }
}
