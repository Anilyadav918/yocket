import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';

import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';

@Injectable()
export default class DatabaseConfigService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const dialectConfig = {
      dialect: this.configService.get('DATABASE_DIALECT'),
      host: this.configService.get('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      database: this.configService.get('DATABASE_NAME'),
      username: this.configService.get('DATABASE_USER'),
      password: this.configService.get('DATABASE_PASS'),
    };
    return {
      define: {
        paranoid: true,
        timestamps: true,
        underscored: true,
      },
      ...dialectConfig,
      synchronize: false,
      autoLoadModels: true,
      logging: this.configService.get<boolean>('DATABASE_QUERY_DEBUG', false)
        ? (e) => Logger.debug(e)
        : false,
    };
  }
}
