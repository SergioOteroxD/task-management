import { IresponseBase } from '../common/entity/response-base.model';
import { IuserContext } from '../common/entity/user-context.interface';
import { Itask } from '../entity/task.entity';

export abstract class IregisterTaskUC {
  /**
   *
   * @param data
   */
  abstract create(
    data: Partial<Itask>,
    user: IuserContext,
  ): Promise<IresponseBase<any>>;
}
