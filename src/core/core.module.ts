import { Module } from '@nestjs/common';
import { DriversModule } from '../drivers/drivers.module';
import {
  IqueryTaskUC,
  IregisterTaskUC,
  IupdateTaskUC,
  QueryTaskUC,
  RegisterVehicleUC,
  UpdateTaskUC,
} from './use_case';

@Module({
  imports: [DriversModule],
  providers: [
    // Task
    { provide: IregisterTaskUC, useClass: RegisterVehicleUC },
    { provide: IqueryTaskUC, useClass: QueryTaskUC },
    { provide: IupdateTaskUC, useClass: UpdateTaskUC },
  ],
  exports: [IregisterTaskUC, IqueryTaskUC, IupdateTaskUC],
})
export class CoreModule {}
