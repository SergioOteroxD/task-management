import { Injectable } from '@nestjs/common';
import { Itask } from '../../entity/task.entity';
import { ItaskDriver } from '../../../drivers/task.driver';
import { IupdateTaskUC } from '../update-task.uc';
import {
  ResponseBase,
  IresponseBase,
} from '../../common/entity/response-base.model';
import { CustomException } from '../../common/entity/custom-exception.model';
import { RESPONSE_CODE } from '../../../commons/response-codes/general-codes';

@Injectable()
export class UpdateTaskUC implements IupdateTaskUC {
  constructor(private taskDriver: ItaskDriver) {}
  async update(
    taskId: string,
    data: Partial<Itask>,
    // user: IuserContext,
  ): Promise<IresponseBase<any>> {
    try {
      const doc = await this.taskDriver.getById(taskId);
      if (!doc)
        return new ResponseBase({
          code: 'TASK_NOT_EXIST_CONFLICT',
          message: `La tarea no existe con el identificador asociado`,
          status: 409,
        });

      await this.taskDriver.update(taskId, data);

      return new ResponseBase({
        code: 'TASK_UPD_OK',
        message: 'La tarea ha sido actualizada correctamente.',
        status: 200,
      });
    } catch (error) {
      if (error instanceof CustomException) throw error;
      throw new CustomException(
        RESPONSE_CODE.ERROR,
        'UpdateTaskUC.update',
        'Technical',
        error,
      );
    }
  }
}
