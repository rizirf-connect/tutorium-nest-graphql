import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthCredentialsInput } from './inputs/auth-credentials.input';
import { AuthService } from './auth.service';
import { AuthResponse } from './models/auth-response.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => AuthResponse)
  signIn(@Args('credentials') credentials: AuthCredentialsInput) {
    return this.authService.login(credentials);
  }
}
