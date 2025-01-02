import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ResponseHttp } from '../../core/common/entity/response-http.model';
import { RegisterTaskDto } from './dto/register-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateStatusTaskDto } from './dto/update-status-task.dto';

@Controller('tasks')
export class TaskController {
  constructor() {} // private updateTaskUC: IupdateTaskUC, // private registerTaskUC: IregisterTaskUC,

  @Post('register')
  async registerTask(@Body() body: RegisterTaskDto) {
    // const result = await this.registerTaskUC.create(body);
    // return new ResponseHttp(result.status, result);
    return new ResponseHttp(200, {
      code: 'OK',
      message: 'Task created',
      status: 201,
    });
  }

  // Actualizar tarea
  @Patch(':taskId/update')
  async updateTask(
    @Body() body: UpdateTaskDto,
    @Param('taskId', ParseIntPipe) taskId: number,
  ) {
    // const result = await this.updateTaskUC.update(taskId, body);
    // return new ResponseHttp(result.status, result);
    return new ResponseHttp(200, {
      code: 'OK',
      message: 'Task updated',
      status: 200,
    });
  }

  // Cambiar estado de tarea
  @Patch(':taskId/update-status')
  async updateStatusTask(
    @Body() body: UpdateStatusTaskDto,
    @Param('taskId', ParseIntPipe) taskId: number,
  ) {
    // const result = await this.updateTaskUC.update(taskId, body);
    // return new ResponseHttp(result.status, result);
    return new ResponseHttp(200, {
      code: 'OK',
      message: 'Task updated',
      status: 200,
    });
  }
}
