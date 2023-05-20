import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { TutorResolver } from './tutor.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [TutorResolver, TutorService, PrismaService],
})
export class TutorModule {}
