import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TutorService } from './tutor.service';
import { Tutor } from './entities/tutor.entity';
import { RegisterTutorInput } from './dto/register-tutor.input';
import { UpdateTutorInput } from './dto/update-tutor.input';
import { UpdateExperienceInput } from './dto/update-experience-input';

@Resolver(() => Tutor)
export class TutorResolver {
  constructor(private readonly tutorService: TutorService) {}

  @Mutation(() => Tutor)
  registerTutor(
    @Args('registerTutorInput') registerTutorInput: RegisterTutorInput,
  ) {
    return this.tutorService.create(registerTutorInput);
  }

  @Query(() => [Tutor], { name: 'tutors' })
  findAll() {
    return this.tutorService.findAll();
  }

  @Query(() => Tutor, { name: 'tutor' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tutorService.findOne(id);
  }

  @Mutation(() => Tutor)
  updateTutor(@Args('updateTutorInput') updateTutorInput: UpdateTutorInput) {
    return this.tutorService.update(updateTutorInput.id, updateTutorInput);
  }

  @Mutation(() => Tutor)
  updateTutorExperience(
    @Args('udateExperienceInput') udateExperienceInput: UpdateExperienceInput,
  ) {
    return this.tutorService.updateExperience(
      udateExperienceInput.id,
      udateExperienceInput,
    );
  }

  @Mutation(() => Tutor)
  removeTutor(@Args('id', { type: () => Int }) id: number) {
    return this.tutorService.remove(id);
  }
}
