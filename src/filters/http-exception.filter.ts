/**
 * 全局异常捕获过滤器
 * */

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { Request, Response} from 'express';

// 定义异常过滤器
@Catch(HttpException)
export class HttpExceptionFiler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    console.log('进入全局异常过滤器');
    // exception 当前正在处理的异常对象
    // host 传递给原始处理程序的参数的一个包装(Response/Request)的引用
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // HttpException 属于基础异常类，可自定义内容
    // 如果是自定义的异常类则抛出自定义status
    // 否则就是内置Http异常类，然后抛出其对应的内置Status内容
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message;

    const msgLog = {
      // 错误状态码
      statusCode: status,
      // 错误日期
      timestamp: new Date().toISOString(),
      // 错误路由
      path: request.url,
      message: '请求失败',
      // 错误消息内容体(争取和拦截器中定义的响应体一样)
      data: message
    };

    // 打印错误综合日志
    Logger.error(
      '错误信息',
      JSON.stringify(msgLog),
      'HttpExceptionFilter'
    );

    response.status(status).json(msgLog)
  }
}