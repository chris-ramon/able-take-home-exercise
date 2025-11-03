import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './events/event.module';
import { RatesModule } from './rates/rates.module';

@Module({
  imports: [EventModule, RatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
