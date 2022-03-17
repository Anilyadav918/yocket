import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configuration from '../common/configs/configuration';
import DatabaseConfigService from '../common/configs/database-config.service';
import AppRouteModule from './app-route.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({ useClass: DatabaseConfigService }),
    AppRouteModule,
  ],
  providers: [Logger],
})
export class AppModule {}
