import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface RequestWithUser extends Request {
  user: any;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
