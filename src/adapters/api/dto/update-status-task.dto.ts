import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { EstatusTask } from '../../../commons/enums/task-status.enum';

export class UpdateStatusTaskDto {
  @ApiProperty({ enum: EstatusTask })
  @IsEnum(EstatusTask)
  status: EstatusTask;
}
