import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { RESPONSE_CODE } from '../../commons/response-codes/general-codes';
import { CustomLogger } from '../../commons/utils/logger';
import { CustomException } from '../../core/common/entity/custom-exception.model';
import {
  ResponseHttp,
  IresponseHttp,
} from '../../core/common/entity/response-http.model';

@Catch()
export class ExceptionManager implements ExceptionFilter {
  // ...
  async catch(exception, host: ArgumentsHost) {
    console.debug(
      'file: exceptions-manager.filter.ts:12 - ExceptionManager - exception:',
      exception,
    );
    const logger = CustomLogger.getInstance();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const result: IresponseHttp = new ResponseHttp();

    if (exception instanceof CustomException) {
      result.status = HttpStatus.BAD_GATEWAY;
      // result.code = exception.code;
      // result.message = exception.message;
    }

    if (exception instanceof HttpException) {
      if (exception.getStatus() != 500) {
        result.status = exception.getStatus();
        result.code =
          exception.getResponse()['code'] ??
          RESPONSE_CODE[result.status]?.code ??
          result?.code;
        result.message =
          RESPONSE_CODE[result.status]?.message ?? result?.message;

        if (result.status == HttpStatus.BAD_REQUEST)
          result.data = exception.getResponse()['message'];
      }
    }

    logger.error(
      `Execution finished with exception. ${exception.message}`,
      exception,
    );
    response.status(result.status).json(result);
  }
}
