import {
  BadRequestException,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { IqueryTaskUC } from '../../core/use_case/query-task.uc';
import {
  IresponseHttp,
  ResponseHttp,
} from '../../core/common/entity/response-http.model';
import { EstatusTask } from '../../commons/enums/task-status.enum';
import { EownerType } from '../../commons/enums/task-owner-type.enum';

@Controller('tasks')
// @UseGuards(AuthJwtGuard)
export class TaskQueryController {
  constructor(private query: IqueryTaskUC) {}
  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number,
    @Query('ownerId') ownerId: string,
    @Query('ownerBy') ownerBy: EownerType,
    @Query('status') status: EstatusTask,
  ) {
    if (page < 1 || limit < 1)
      throw new BadRequestException(
        'Los valores de paginación no son válidos.',
      );

    const result = await this.query.getAll(
      page,
      limit,
      { ownerId, ownerBy, status },
      undefined,
    );

    return new ResponseHttp(result.status, result);
  }

  @Get(':taskId')
  async getUserById(@Param('taskId') taskId: string): Promise<IresponseHttp> {
    const result = await this.query.getById(taskId);

    return new ResponseHttp(result.status, result);
  }
}
