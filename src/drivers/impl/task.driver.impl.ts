import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Model,
  FilterQuery,
  UpdateQuery,
  ProjectionType,
  SortOrder,
} from 'mongoose';
import { Task } from '../model/task.model';
import { ItaskDriver } from '../task.driver';
import { CustomException } from '../../core/common/entity/custom-exception.model';

@Injectable()
export class TaskDriver implements ItaskDriver {
  constructor(@InjectModel(Task.name) private productModel: Model<Task>) {}

  async register(data: Partial<Task>): Promise<Task> {
    try {
      const generatorDataRegister = new this.productModel(data);
      return await generatorDataRegister.save();
    } catch (error) {
      Logger.log('ERROR', error?.message, 'TaskDriver.register', {
        data: error,
        type: 'EXCEPTION',
        tags: 'POSTGRES_DB',
      });
      throw new CustomException(
        { code: 'TECH001', message: error?.message, status: 500 },
        'TaskDriver.register',
        'Technical',
        error,
      );
    }
  }

  async getTotal(filter: FilterQuery<Task>): Promise<number> {
    return await this.productModel.find(filter).countDocuments().exec();
  }

  async getAll(
    page: number,
    limit: number,
    filter: FilterQuery<Task>,
    projection?: ProjectionType<Task>,
    sort?: {
      [key: string]: SortOrder;
    },
  ): Promise<Task[]> {
    return await this.productModel
      .find(filter)
      .skip(limit * (page - 1))
      .limit(limit)
      .select(projection)
      .sort(sort)
      .exec();
  }

  async update(taskId: string, changes: UpdateQuery<Task>) {
    return await this.productModel
      .findOneAndUpdate({ taskId }, changes, { new: true, upsert: true })
      .exec();
  }

  async getById(id: string, projection?: ProjectionType<Task>): Promise<Task> {
    return await this.productModel.findById(id).select(projection).exec();
  }

  async getOne(filter: FilterQuery<Task>): Promise<Task> {
    return await this.productModel.findOne(filter).exec();
  }
}
