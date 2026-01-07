import { type CanActivate, type ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { type User, type UserRole } from '@prisma/client'
import { ROLES_KEY } from '../decorators/roles.decorator'


@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) { }
	canActivate(context: ExecutionContext): boolean {
		const rolesContext = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

		if (!rolesContext) return true

		const ctx = GqlExecutionContext.create(context)
		const request = ctx.getContext().req
		const user = request.user as User

		if (!rolesContext.includes(user.role)) {
			throw new ForbiddenException('You do not have permission to access this resource')
		}

		return true
	}
}