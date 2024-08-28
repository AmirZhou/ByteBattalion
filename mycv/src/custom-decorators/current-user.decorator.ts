import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    // context is kind of a wrapper around the incoming Request, because nestjs deal with not only HTTP
    // the data, is what you passed into the decorator when you call it
    // this is the factory function, whatever you return here
    // it will become the parameter
    const request = context.switchToHttp().getRequest();
    // console.log(request.session.userId);
    // return 'I should return a user based on the id\n which means, i need to have access to the repo';
    return request.currentUser; // there's no type safty. how you gonna do with it

    // by doing this, we don't need to have access to the request obj inside the handler, and make our handler
    // declarative.
  },
);
