import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LectureModule } from 'src/lecture/lecture.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => LectureModule)],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
