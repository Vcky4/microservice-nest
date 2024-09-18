import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { RpcException as NestRpcException } from '@nestjs/microservices';

@Catch(HttpException, NestRpcException)
export class RpcExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException | NestRpcException, host: ArgumentsHost) {
        const ctx = host.switchToRpc();
        const rpcContext = ctx.getContext();
        let response: any;

        if (exception instanceof NestRpcException) {
            response = {
                statusCode: 500, // or another status code if appropriate
                message: exception.message || 'An error occurred',
            };
        } else if (exception instanceof HttpException) {
            const status = exception.getStatus();
            response = {
                statusCode: status,
                message: exception.message,
            };
        } else {
            response = {
                statusCode: 500,
                message: 'Internal server error',
            };
        }

        // Log the error for debugging
        console.error('Exception Filter:', response);

        // Emit the error to the client
        rpcContext.emit('error', response);
    }
}
