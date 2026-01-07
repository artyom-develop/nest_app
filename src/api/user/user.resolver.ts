import { Resolver, Query, Mutation } from '@nestjs/graphql'
import { UserService } from './user.service'
import { UserModel } from './models/user.model'
import { Authorization } from '../auth-graphql/decorators/authorization.decorator'
import { Authorized } from '../auth-graphql/decorators/authorized.decorator'
import { UserRole, type User } from '@prisma/client'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  // @Query(() => [UserModel])
  // getUsers() {
  //   return this.userService.findAll();
  // }

  @Authorization()
  @Query(() => UserModel)
  async getMe(@Authorized('id') id: string) {
    return this.userService.getUserById(id)
  }

  @Authorization(UserRole.ADMIN)
  @Query(() => [UserModel], { description: 'Get all users (Admin only)' })
  async getAll() {
    return this.userService.getAllUsers()
  }
}
