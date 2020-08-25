import { Controller, Post, Body } from '@nestjs/common';
import {UserService} from './user.service';
import { UserLoginDto } from './dto/user.login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('login')
  loginIn(@Body() userLoginDto: UserLoginDto) {
    return this.userService.loginIn(userLoginDto)
  }
}