import { createUnionType } from '@nestjs/graphql';
import { isDefined } from 'class-validator';
import { LiveSession } from '../models/live-session.model';
import { RecordedSession } from '../models/recorded-session.model';

export const SessionUnion = createUnionType({
  name: 'SessionUnion',
  types: () => [LiveSession, RecordedSession] as const,
  resolveType(value) {
    if (isDefined(value.url)) {
      return 'LiveSession';
    }

    if (isDefined(value.price)) {
      return 'RecordedSession';
    }

    return null;
  },
});
