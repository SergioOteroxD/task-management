import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { ExceptionManager } from './lib/exceptions-manager.filter';
import { RequestHttpInterceptor } from './lib/request-http.interceptor';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './api/health.controller';
import { TaskController } from './api/task.controller';
import { TaskQueryController } from './api/query-task.controller';

@Module({
  imports: [CoreModule, TerminusModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionManager,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestHttpInterceptor,
    },
  ],
  controllers: [HealthController, TaskController, TaskQueryController],
})
export class AdaptersModule {}
