import {
  InputType,
  IntersectionType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { Session } from '../models/session.model';
import { LiveSession } from '../models/live-session.model';

@InputType()
export class CreateLiveSessionInput extends IntersectionType(
  PickType(Session, ['courseId'] as const, InputType),
  OmitType(LiveSession, ['id'] as const, InputType),
) {}
