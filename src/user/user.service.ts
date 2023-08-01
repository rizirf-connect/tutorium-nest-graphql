import { Injectable } from '@nestjs/common';
import { FilterUserInput } from './inputs/filter-user.input';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindUserInput } from './inputs/find-user.input';
import { CreateUserInput } from './inputs/create-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  findOne(findUserInput: FindUserInput) {
    return this.users.findOneByOrFail({ ...findUserInput });
  }

  findAll(filterUserInput: FilterUserInput) {
    return this.users.findBy({ ...filterUserInput });
  }

  async create(createUserInput: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    return this.users.save({
      ...createUserInput,
      password: hashedPassword,
    });
  }
}
