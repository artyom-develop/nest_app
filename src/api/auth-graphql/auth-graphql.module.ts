import { Module } from '@nestjs/common';
import { AuthGraphqlService } from './auth-graphql.service';
import { AuthGraphqlResolver } from './auth-graphql.resolver';
import { AuthModule } from '../../core/services/auth/auth.module';



@Module({
  imports: [AuthModule],
  providers: [AuthGraphqlResolver, AuthGraphqlService],
})
export class AuthGraphqlModule {}
