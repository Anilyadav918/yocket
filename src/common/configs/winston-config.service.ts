import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  utilities as NestWinstonModuleUtilities,
  WinstonModuleOptions,
  WinstonModuleOptionsFactory,
} from 'nest-winston';

import winston from 'winston';

export const WinstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        NestWinstonModuleUtilities.format.nestLike(process.env.SERVER_NAME, {
          prettyPrint: true,
        }),
      ),
    }),
  ],
};

@Injectable()
export default class WinstonConfigService
  implements WinstonModuleOptionsFactory
{
  constructor(private configService: ConfigService) {}
  createWinstonModuleOptions():
    | Promise<WinstonModuleOptions>
    | WinstonModuleOptions {
    return WinstonConfig;
  }
}
