import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { WinstonModule } from 'nest-winston';
import { WinstonConfig } from './common/configs/winston-config.service';
import { useContainer, ValidationError } from 'class-validator';
import helmet from 'helmet';
import {
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { swaggerSetup } from './common/configs/swagger.setup';
import { snakeCase } from 'snake-case';

async function bootstrap() {
  const port = process.env.SERVER_PORT
    ? parseInt(process.env.SERVER_PORT, 10)
    : 3000;
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(WinstonConfig),
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(helmet());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        'script-src': ["'self'"],
        upgradeInsecureRequests: null,
      },
    }),
  );
  app.enableCors();
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors) => {
        const errorMessages: any = [];

        function validationErrors(errors?: ValidationError[]) {
          errors?.map((error) => {
            const constraints = error.constraints
              ? Object.values(error.constraints).pop()
              : null;
            errorMessages.push({
              field: snakeCase(error.property),
              message: constraints,
            });
            validationErrors(error.children);
          });
        }

        validationErrors(errors);

        return new UnprocessableEntityException({
          message: errorMessages,
          error_code: HttpStatus.EXPECTATION_FAILED,
          error: 'Global Error',
        });
      },
    }),
  );

  swaggerSetup(app);
  await app.listen(port, async () =>
    Logger.log(
      `Nest Application Server Running on ${port}: ${await app.getUrl()}`,
    ),
  );
}
bootstrap().then(() =>
  Logger.log('Nest Application Server Started, Ready to accept request'),
);
