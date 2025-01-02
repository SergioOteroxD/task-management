import { Controller, Get, HttpCode } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';
import { ResponseBase } from '../../core/common/entity/response-base.model';
import { ResponseHttp } from '../../core/common/entity/response-http.model';

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Get()
  @HttpCode(200)
  @HealthCheck()
  async check() {
    const result = await this.health.check([]);
    console.log('🚀 ~ HealthController ~ check ~ result:', result);
    return new ResponseHttp(
      200,
      new ResponseBase({ code: 'ok', message: 'ok', status: 200 }, result),
    );
  }
}
