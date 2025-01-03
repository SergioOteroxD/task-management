import { Injectable } from '@nestjs/common';
import { IregisterTaskUC } from '../register-task.uc';
import { ItaskDriver } from '../../../drivers/task.driver';
import { IuserContext } from '../../common/entity/user-context.interface';
import { Itask } from '../../entity/task.entity';
import {
  IresponseBase,
  ResponseBase,
} from '../../common/entity/response-base.model';
import { CustomException } from '../../common/entity/custom-exception.model';
import { RESPONSE_CODE } from '../../../commons/response-codes/general-codes';
import { EownerType } from '../../../commons/enums/task-owner-type.enum';

@Injectable()
export class RegisterVehicleUC implements IregisterTaskUC {
  constructor(private taskDriver: ItaskDriver) {}
  async create(
    data: Partial<Itask>,
    user: IuserContext,
  ): Promise<IresponseBase<any>> {
    try {
      const task = await this.taskDriver.register({
        ...data,
        ownerId: user.accountId,
        ownerBy: EownerType.USER,
      });
      return new ResponseBase(
        {
          code: 'TASK_REG_OK',
          message: 'Vehículo ha sido creada correctamente.',
          status: 201,
        },
        { taskId: task.taskId },
      );
    } catch (error) {
      if (error instanceof CustomException) throw error;
      throw new CustomException(
        RESPONSE_CODE.ERROR,
        'RegisterClientUC.create',
        'Technical',
        error,
      );
    }
  }
}
