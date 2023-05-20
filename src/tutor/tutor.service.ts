import { Injectable } from '@nestjs/common';
import { RegisterTutorInput } from './dto/register-tutor.input';
import { UpdateTutorInput } from './dto/update-tutor.input';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateExperienceInput } from './dto/update-experience-input';

@Injectable()
export class TutorService {
  constructor(private prismaService: PrismaService) {}

  async create(registerTutorInput: RegisterTutorInput) {
    const hashedPassword = await bcrypt.hash(registerTutorInput.password, 10);

    return this.prismaService.tutor.create({
      data: {
        firstName: registerTutorInput.firstName,
        lastName: registerTutorInput.lastName,
        email: registerTutorInput.email,
        phone: registerTutorInput.phone,
        password: hashedPassword,
        school: registerTutorInput.school,
      },
    });
  }

  findAll() {
    return this.prismaService.tutor.findMany();
  }

  findOne(id: number) {
    return this.prismaService.tutor.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateTutorInput: UpdateTutorInput) {
    return `This action updates a #${id} tutor`;
  }

  updateExperience(id: number, updateExperienceInput: UpdateExperienceInput) {
    return this.prismaService.tutor.update({
      where: {
        id: id,
      },
      data: {
        experience: updateExperienceInput.experience,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} tutor`;
  }
}
