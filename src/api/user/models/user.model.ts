import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'
import { UserRole, type User } from '@prisma/client'
import { BaseModel } from '../../../shared/models/base.model'

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'The role of the user',
})

@ObjectType({
  description: 'User model representing a user in the system',
})
export class UserModel extends BaseModel implements User {

  @Field(() => String, {
    description: 'The name of the user',
    defaultValue: 'Artem',
  })
  name: string


  @Field(() => String, {
    description: 'The email of the user',
    defaultValue: 'artem@mail.ru',
  })
  email: string

  @Field(() => String, {
    description: 'The password of the user',
    defaultValue: '12345678Qq',
  })
  password: string

  @Field(() => UserRole, {
    description: 'The role of the user and admin',
    nullable: false,
    defaultValue: 'USER',
  })
  role: UserRole

}
