import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './CreateUserRequest.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { description: 'Identification number of user' })
  identificationNumber: string;
}
