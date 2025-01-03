import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GeneralUtils } from 'src/commons/utils/general.util';
import { EstatusTask } from '../../commons/enums/task-status.enum';
import { EownerType } from '../../commons/enums/task-owner-type.enum';
import { Itask } from '../../core/entity/task.entity';

export type TaskDocument = Task & Document;

@Schema({
  collection: 'tasks',
  timestamps: true,
})
export class Task implements Itask {
  @Prop({ default: () => GeneralUtils.getUuid, index: true, unique: true }) // Genera un UUID automáticamente
  taskId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ required: true, default: true })
  active: boolean;

  @Prop({
    required: true,
    enum: EstatusTask,
    index: true,
    default: EstatusTask.PENDING,
  })
  status: EstatusTask;

  @Prop({ required: true, index: true })
  ownerId: string;

  @Prop({ required: true, enum: EownerType })
  ownerBy: EownerType;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
