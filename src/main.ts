import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');
  const host: string = config.get<string>('HOST');

  /**
   * Swagger Config
   * https://docs.nestjs.com/openapi/introduction
   */
  const docConfig = new DocumentBuilder()
    .setTitle('Postal Code Service')
    .setDescription(
      'Service to get a list of provinces, cities, districts, villages and postal codes of Indonesia',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('docs', app, document);

  /**
   * Enable Helmet
   * Helmet helps you secure your Express apps by setting various HTTP headers.
   * https://github.com/helmetjs/helmet#how-it-works
   */
  app.use(helmet());

  /**
   * Enable Cors
   * https://docs.nestjs.com/security/cors
   */
  app.enableCors();

  await app.listen(port, host, () => {
    console.log('[SERVICE]', `//${host}:${port}`);
  });
}
bootstrap();
