import { EstatusTask } from '../../commons/enums/task-status.enum';
import { EownerType } from '../../commons/enums/task-owner-type.enum';

export interface Itask {
  taskId: string;
  title: string;
  description: string;
  dueDate: Date;
  active: boolean;
  status: EstatusTask;
  ownerId: string;
  ownerBy: EownerType;
}
