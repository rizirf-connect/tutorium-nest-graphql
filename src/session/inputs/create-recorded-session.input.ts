import { InputType, IntersectionType, PickType } from '@nestjs/graphql';
import { RecordedSession } from '../models/recorded-session.model';
import { Session } from '../models/session.model';

@InputType()
export class CreateRecordedSessionInput extends IntersectionType(
  PickType(Session, ['courseId'] as const, InputType),
  PickType(RecordedSession, ['price'] as const, InputType),
) {}
