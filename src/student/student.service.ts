import { Injectable } from '@nestjs/common';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(private prismaService: PrismaService) {}

  async create(createStudentInput: CreateStudentInput) {
    const hashedPassword = await bcrypt.hash(createStudentInput.password, 10);

    return this.prismaService.student.create({
      data: {
        firstName: createStudentInput.firstName,
        lastName: createStudentInput.lastName,
        email: createStudentInput.email,
        phone: createStudentInput.phone,
        password: hashedPassword,
        school: createStudentInput.school,
      },
    });
  }

  findAll() {
    return this.prismaService.student.findMany();
  }

  findOne(id: number) {
    return this.prismaService.student.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateStudentInput: UpdateStudentInput) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
