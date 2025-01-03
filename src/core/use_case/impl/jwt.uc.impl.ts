import { Injectable } from '@nestjs/common';
import { IjwtDriver } from '../../../drivers/jwt.driver';
import { IjwtUC } from '../jwt.uc';

@Injectable()
export class JwtUC implements IjwtUC {
  constructor(private jwtService: IjwtDriver) {}

  async sign(token: any) {
    return await this.jwtService.sign(token);
  }

  async verify(token: any) {
    return await this.jwtService.verify(token);
  }
}
