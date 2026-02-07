import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpsController } from './ops.controller';
import { OpsService } from './ops.service';

@Module({
  imports: [],
  controllers: [AppController, OpsController],
  providers: [AppService, OpsService],
})
export class AppModule {}
