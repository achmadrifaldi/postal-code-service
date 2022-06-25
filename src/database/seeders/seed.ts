import { NestFactory } from '@nestjs/core';
import { SampleDataModule } from './sample-data/sample-data.module';
import { SampleDataService } from './sample-data/sample-data.service';

async function bootstrap() {
  NestFactory.createApplicationContext(SampleDataModule)
    .then(async (appContext) => {
      const seeder = appContext.get(SampleDataService);

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
