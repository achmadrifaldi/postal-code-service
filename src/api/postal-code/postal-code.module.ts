import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostalCode } from './entities/postal-code.entity';
import { PostalCodeController } from './postal-code.controller';
import { PostalCodeService } from './postal-code.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostalCode])],
  controllers: [PostalCodeController],
  providers: [PostalCodeService],
  exports: [PostalCodeService],
})
export class PostalCodeModule {}
