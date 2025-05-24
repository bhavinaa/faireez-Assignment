import { Module } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { RandomUserService } from './random-user.service';

@Module({
  providers:   [ApiService, RandomUserService],
  exports:     [RandomUserService],
})
export class RandomUserModule {}