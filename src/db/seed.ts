import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then(async (appContext) => {
      const seeder = appContext.get(SeederService);

      await seeder.extractProvince();
      await seeder.extractCity();
      await seeder.extractSubDistrict();
      await seeder.extractVillage();
      await seeder.extractPostalCode();
    })
    .catch((error) => {
      throw error;
    });
}
bootstrap();
