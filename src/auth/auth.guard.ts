import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const headers = ctx.req.headers;
    const authorization = headers.authorization;
    const tokenType = authorization?.split(' ')[0];
    const token = authorization?.split(' ')[1];

    if (
      !authorization ||
      tokenType !== 'Bearer' ||
      !token.match('^[A-Za-z0-9-_]+.[A-Za-z0-9-_]+.[A-Za-z0-9-_]*$')
    ) {
      throw new UnauthorizedException({
        error: 'Unauthorized',
        message: 'User unauthorized',
        statusCode: 401,
      });
    }

    return true;
  }
}
