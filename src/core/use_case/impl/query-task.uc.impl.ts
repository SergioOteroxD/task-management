import { Injectable } from '@nestjs/common';
import { ItaskDriver } from '../../../drivers/task.driver';
import { FilterQuery } from 'mongoose';
import { RESPONSE_CODE } from '../../../commons/response-codes/general-codes';
import { ResponseQuery } from '../../common/entity/response-base.model';
import {
  IresponseBase,
  ResponseBase,
} from '../../common/entity/response-base.model';
import { Task } from '../../../drivers/model/task.model';
import { IfilterTask } from '../../entity/filter/filter-task.entity';
import { IqueryTaskUC } from '../query-task.uc';

@Injectable()
export class QueryTaskUC implements IqueryTaskUC {
  constructor(private taskDriver: ItaskDriver) {}

  async getById(value: string): Promise<IresponseBase<any>> {
    const doc = await this.taskDriver.getOne({ taskId: value });
    if (!doc) return new ResponseBase(RESPONSE_CODE.NOT_FOUND);

    return new ResponseBase(RESPONSE_CODE.QUERY_OK, doc);
  }

  async getAll(
    page: number,
    limit: number,
    _filter: IfilterTask,
    projection: any = [],
  ): Promise<IresponseBase> {
    const filter: FilterQuery<Task> = {};
    if (_filter?.ownerId) filter['ownerId'] = _filter.ownerId;
    if (_filter?.status) filter['status'] = _filter.status;

    if (_filter?.ownerBy) filter['ownerBy'] = _filter.ownerBy;

    const total: number = await this.taskDriver.getTotal(filter);

    if (total == 0) return new ResponseBase(RESPONSE_CODE.NOT_FOUND);

    const data = await this.taskDriver.getAll(page, limit, filter, projection);

    return new ResponseQuery(RESPONSE_CODE.QUERY_OK, data, page, limit, total);
  }
}
