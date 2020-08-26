/**
 * 全局响应拦截器，统一返回体内容
 */
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Response<T> {
  data: T
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    console.log('进入全局响应拦截器...');
    return next.handle().pipe(
      map(data => {
        console.log('全局响应拦截器方法返回内容后...');
        return {
          statusCode: 0,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: 'success',
          data: data
        }
      })
    )
  }
}