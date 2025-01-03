import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ResponseHttp } from '../../core/common/entity/response-http.model';
import { RegisterTaskDto } from './dto/register-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateStatusTaskDto } from './dto/update-status-task.dto';
import { IupdateTaskUC } from '../../core/use_case/update-task.uc';
import { IregisterTaskUC } from '../../core/use_case/register-task.uc';

@Controller('tasks')
export class TaskController {
  constructor(
    private updateTaskUC: IupdateTaskUC,
    private registerTaskUC: IregisterTaskUC,
  ) {}

  @Post('register')
  async registerTask(@Body() body: RegisterTaskDto) {
    const result = await this.registerTaskUC.create(body, {
      accountId: '1',
      sessionId: '1',
      exp: 1,
      iat: 1,
    });
    return new ResponseHttp(result.status, result);
  }

  // Actualizar tarea
  @Patch(':taskId/update')
  async updateTask(
    @Body() body: UpdateTaskDto,
    @Param('taskId') taskId: string,
  ) {
    const result = await this.updateTaskUC.update(taskId, body, {
      accountId: '1',
      sessionId: '1',
      exp: 1,
      iat: 1,
    });
    return new ResponseHttp(result.status, result);
  }

  // Cambiar estado de tarea
  @Patch(':taskId/update-status')
  async updateStatusTask(
    @Body() body: UpdateStatusTaskDto,
    @Param('taskId') taskId: string,
  ) {
    const result = await this.updateTaskUC.update(taskId, body, {
      accountId: '1',
      sessionId: '1',
      exp: 1,
      iat: 1,
    });
    return new ResponseHttp(result.status, result);
  }
}
