import { EstatusTask } from 'src/commons/enums/task-status.enum';
import { EownerType } from '../../../commons/enums/task-owner-type.enum';

export interface IfilterTask {
  status: EstatusTask;
  ownerId: string;
  ownerBy: EownerType;
}
