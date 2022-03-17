import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import basicAuth from 'express-basic-auth';

export const swaggerSetup = (app: INestApplication) => {
  const documents = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Yocket | API Documentation')
      .setDescription('API Documentation')
      .setVersion('1.0.0')
      .addServer(<string>process.env.SWAGGER_HOST)
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'bearer',
        },
        'bearer',
      )
      .build(),
  );

  if (process.env.NODE_ENV === 'production') {
    app.use(
      '/swagger',
      basicAuth({
        challenge: true,
        users: {
          [<string>process.env.SWAGGER_USER]: <string>process.env.SWAGGER_PASS,
        },
      }),
    );
  }
  return SwaggerModule.setup('/swagger', app, documents);
};
