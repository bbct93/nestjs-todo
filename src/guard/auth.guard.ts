/**
 * 全局权限验证守卫，用户验证用户身份
 * **/

import {Injectable, CanActivate, HttpException, HttpStatus, ExecutionContext} from '@nestjs/common';
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('进入全局权限守卫......');

    const request = context.switchToHttp().getRequest();
    const token = context.switchToRpc().getData().headers.token;
    // 如果白名单内的路由就不拦截直接通过
    if(this.hasUrl(this.urlList, request.url)) {
      try {
        // 这里添加验证逻辑
        return true
      } catch (e) {
        throw new HttpException(
          '没有授权访问，请先登录',
          HttpStatus.UNAUTHORIZED
        )
      }
    } else {
      throw new HttpException(
        '没有授权访问，请先登录',
        HttpStatus.UNAUTHORIZED
      )
    }
  }

  private urlList: string[] = [
    '/user/login'
  ];

  // 验证该次请求是否为白名单的路由
  private hasUrl(urlList: string[], url: string): boolean {
    let flag = false;
    if(urlList.indexOf(url) >= 0) {
      flag = true
    }
    return flag
  }
}