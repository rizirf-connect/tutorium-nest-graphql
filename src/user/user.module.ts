import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/common/services/prisma.service';
import { SessionModule } from 'src/session/session.module';

@Module({
  imports: [forwardRef(() => SessionModule)],
  providers: [UserResolver, UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
