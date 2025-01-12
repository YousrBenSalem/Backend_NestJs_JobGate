/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestSchema } from './entities/test.entity';
import { OffreSchema } from 'src/offre/entities/offre.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:'test',
        schema:TestSchema
      },
      {
        name:'offre',
        schema:OffreSchema
      }
    ])
  ],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
