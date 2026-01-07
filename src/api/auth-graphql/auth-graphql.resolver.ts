import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGraphqlService } from './auth-graphql.service';
import { type GraphqlContext } from '../../shared/interfaces/graphql-context.interface';
import { AuthModel } from './models/auth.model';
import { RegisterRequest } from './inputs/regester.input';
import { LoginRequest } from './inputs/login.input';
import { LogoutModel } from './models/logout.model';
import { Authorized } from './decorators/authorized.decorator';
import { Authorization } from './decorators/authorization.decorator';

@Resolver()
export class AuthGraphqlResolver {
  constructor(private readonly authGraphqlService: AuthGraphqlService) {}

  @Query(() => String)
  test(@Context() context: GraphqlContext) {
    console.log(context.req);
    return 'Hello GraphQL';
  }

  @Mutation(() => AuthModel)
  async register(
    @Context() { res }: GraphqlContext,
    @Args('data') input: RegisterRequest,
  ) {
    return this.authGraphqlService.registerUser(res, input);
  }
  @Mutation(() => AuthModel)
  async login(
    @Context() { res }: GraphqlContext,
    @Args('data') input: LoginRequest,
  ) {
    return this.authGraphqlService.LoginUser(res, input);
  }

  @Mutation(() => AuthModel)
  async refresh(@Context() { req, res }: GraphqlContext) {
    return this.authGraphqlService.refreshUser(req, res);
  }

  @Mutation(() => LogoutModel)
  async logout(@Context() { req, res }: GraphqlContext) {
    return this.authGraphqlService.logoutUser(req, res);
  }


}
