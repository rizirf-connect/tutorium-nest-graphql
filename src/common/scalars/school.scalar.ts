import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomScalar, Scalar } from '@nestjs/graphql';

@Scalar('School')
@Injectable()
export class SchoolScalar implements CustomScalar<string, string> {
  constructor(private configService: ConfigService) {}

  description = 'School custom scalar type';

  parseValue(value: string): string {
    return this.validateValue(value);
  }

  serialize(value: string): string {
    return this.validateValue(value);
  }

  parseLiteral(ast: any): string {
    if (ast.kind === 'StringValue') {
      return this.validateValue(ast.value);
    }
    throw new Error('Invalid value');
  }

  private validateValue(value: string): string {
    const validValues = this.configService.get<string[]>('schools');
    if (validValues.includes(value)) {
      return value;
    }
    throw new Error('Invalid value');
  }
}
