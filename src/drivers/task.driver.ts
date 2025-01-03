import { FilterQuery, ProjectionType, SortOrder, UpdateQuery } from 'mongoose';
import { Task } from './model/task.model';

export abstract class ItaskDriver {
  abstract register(data: Partial<Task>): Promise<Task>;

  abstract getTotal(filter: FilterQuery<Task>): Promise<number>;

  abstract getAll(
    page: number,
    limit: number,
    filter: FilterQuery<Task>,
    projection?: ProjectionType<Task>,
    sort?: {
      [key: string]: SortOrder;
    },
  ): Promise<Task[]>;

  abstract update(reportId: string, data: UpdateQuery<Task>);

  abstract getById(
    reportId: string,
    projection?: ProjectionType<Task>,
  ): Promise<Task>;

  abstract getOne(filter: FilterQuery<Task>): Promise<Task>;
}
