import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LogoutModel {
  @Field(() => Boolean)
  error: boolean;
  @Field(() => String)
  message: string;
}
