import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { LocalController } from 'src/auth/providers/local/local.controller';

import { LocalService } from './local.service';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [LocalController],
  exports: [LocalService],
  imports: [AuthModule],
  providers: [LocalStrategy, LocalService],
})
export class LocalModule {}
