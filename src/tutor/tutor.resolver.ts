import { Resolver } from '@nestjs/graphql';
import { TutorService } from './tutor.service';

@Resolver()
export class TutorResolver {
  constructor(private readonly tutorService: TutorService) {}
}
