import { IresponseBase } from '../common/entity/response-base.model';
import { IuserContext } from '../common/entity/user-context.interface';
import { Itask } from '../entity/task.entity';

export abstract class IupdateTaskUC {
  /**
   *
   * @param taskId
   * @param data
   * @param user
   */
  abstract update(
    taskId: string,
    data: Partial<Itask>,
    user: IuserContext,
  ): Promise<IresponseBase<any>>;
}
