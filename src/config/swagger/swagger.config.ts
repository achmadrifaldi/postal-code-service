import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app) => {
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
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('docs', app, document);
};
