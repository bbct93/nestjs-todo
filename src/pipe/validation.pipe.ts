import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException
} from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform<any>{
  // value 是当前处理的参数，metatype是属性的元类型
  async transform(value: any, {metatype}: ArgumentMetadata): any {
    console.log('进入全局管道...');
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    // plainToClass方法将普通的js对象转化为特定类的实例
    const object = plainToClass(metatype, value);
    // 验证该对象返回出错的数组
    const errors = await validate(object);
    if(errors.length > 0) {
      // 将错误数组的第一个内容返回给异常过滤器
      const errormsg = errors.shift().constraints;
      throw new BadRequestException(errormsg)
    }
    return value
  }

  // 验证属性值的元类型是否是string， Boolean， number， array， object中的一种
  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype)
  }
}