import { CourseType, PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const umerBukhari = await prisma.user.upsert({
    where: { email: 'umer.bukhari@kdyslab.com' },
    update: {
      firstName: 'Umer',
      lastName: 'Bukhari',
    },
    create: {
      email: 'umer.bukhari@kdyslab.com',
      password: bcrypt.hashSync('secret@kdys', 10),
      role: Role.ADMIN,
    },
  });

  const shahbazKhan = await prisma.user.upsert({
    where: { email: 'shahbaz.khan@kdyslab.com' },
    update: {
      firstName: 'Shahbaz',
      lastName: 'Khan',
    },
    create: {
      email: 'shahbaz.khan@kdyslab.com',
      password: bcrypt.hashSync('secret@kdys', 10),
      role: Role.TUTOR,
    },
  });

  const ghousAli = await prisma.user.upsert({
    where: { email: 'ali.malik@kdyslab.com' },
    update: {
      firstName: 'Ghaus',
      lastName: 'Ali',
    },
    create: {
      email: 'ali.malik@kdyslab.com',
      password: bcrypt.hashSync('secret@kdys', 10),
      role: Role.TUTOR,
    },
  });

  const muslimRaza = await prisma.user.upsert({
    where: { email: 'muslim.raza@kdyslab.com' },
    update: {
      role: Role.STUDENT,
      firstName: 'Muslim',
      lastName: 'Raza',
    },
    create: {
      email: 'muslim.raza@kdyslab.com',
      password: bcrypt.hashSync('secret@kdys', 10),
      role: Role.TUTOR,
    },
  });

  const syedArmaghan = await prisma.user.upsert({
    where: { email: 'syed.armaghan@kdyslab.com' },
    update: {
      firstName: 'Syed',
      lastName: 'Armaghan',
    },
    create: {
      role: Role.STUDENT,
      firstName: 'Muslim',
      lastName: 'Raza',
      email: 'syed.armaghan@kdyslab.com',
      password: bcrypt.hashSync('secret@kdys', 10),
    },
  });

  const courses = await prisma.course.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Mathematics', type: CourseType.IB },
      { name: 'Mathematics', type: CourseType.VCE },
      { name: 'English', type: CourseType.VCE },
      { name: 'English', type: CourseType.IB },
      { name: 'Psychology', type: CourseType.VCE },
      { name: 'Theatre', type: CourseType.IB },
      { name: 'Physics', type: CourseType.IB },
      { name: 'Chemistry', type: CourseType.IB },
    ],
  });

  console.log('DB seed successfull.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
