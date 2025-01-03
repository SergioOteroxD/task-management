import { ProjectionType } from 'mongoose';
import { IresponseBase } from '../common/entity/response-base.model';
import { IfilterTask } from '../entity/filter/filter-task.entity';

export abstract class IqueryTaskUC {
  abstract getById(
    value: string,
    projection?: ProjectionType<any>,
  ): Promise<IresponseBase<any>>;

  abstract getAll(
    page: number,
    limit: number,
    _filter: IfilterTask,
    // _sort: { by: EqueryOrderBy; type: EqueryOrder },
    projection: any,
  ): Promise<IresponseBase>;
}
