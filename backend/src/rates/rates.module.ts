import { Module } from '@nestjs/common';
import { RatesService } from './rates.service';
import { EventModule } from '../events/event.module';

@Module({
  providers: [RatesService],
  imports: [EventModule],
})
export class RatesModule {}