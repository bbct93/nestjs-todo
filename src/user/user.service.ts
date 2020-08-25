import { Injectable } from '@nestjs/common';
import {LoginInInterface} from './interfaces/loginIn.interface';

@Injectable()
export class UserService {
  loginIn(loginInfo: LoginInInterface) {
    console.log('loginInfo---->', loginInfo)
  }
}