import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsString } from 'class-validator';
import { EstatusTask } from '../../../commons/enums/task-status.enum';

export class RegisterTaskDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDateString()
  dueDate: Date;

  @ApiProperty({ enum: EstatusTask })
  @IsEnum(EstatusTask)
  status: EstatusTask;
}
