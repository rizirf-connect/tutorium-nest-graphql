import { Catch, ConflictException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ApolloError } from 'apollo-server-express';

@Catch()
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  catch(exception: unknown) {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (
        exception?.code === 'P2002' &&
        exception?.meta?.target?.toString().includes('email')
      ) {
        // Handle unique constraint violation for email field
        throw new ConflictException('Email already exists');
      } else {
        throw new ApolloError('Phone already exists', '409');
      }
    }

    // Handle other types of exceptions if needed

    throw exception;
  }
}
