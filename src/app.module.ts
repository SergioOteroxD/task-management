import { Module } from '@nestjs/common';
import { CommonsModule } from './commons/commons.module';
import { CoreModule } from './core/core.module';
import { DriversModule } from './drivers/drivers.module';
import { AdaptersModule } from './adapters/adapters.module';

@Module({
  imports: [AdaptersModule, CommonsModule, CoreModule, DriversModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
