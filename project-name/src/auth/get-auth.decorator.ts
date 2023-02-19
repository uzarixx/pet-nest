import {createParamDecorator, ExecutionContext} from '@nestjs/common';
export const UserAuth = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        try {
            const request = ctx.switchToHttp().getRequest();
            const user = request.user
            return user
        } catch (e) {
            console.log(e)
        }
    },
);