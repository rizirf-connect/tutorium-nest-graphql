import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class RecordedSessionService {
  constructor(private readonly prismaService: PrismaService) {}

  findOne(id: number) {
    return this.prismaService.recordedSession.findUnique({ where: { id: id } });
  }
}
