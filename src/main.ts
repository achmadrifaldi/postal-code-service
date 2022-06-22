import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  const docConfig = new DocumentBuilder()
    .setTitle('Postal Code Service')
    .setDescription(
      'Service to get a list of provinces, cities, districts, villages and postal codes of Indonesia',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () => {
    console.log('[SERVICE]', config.get<string>('BASE_URL'));
  });
}
bootstrap();
