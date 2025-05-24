import { Module } from '@nestjs/common';
import { ContactsService }    from './contacts.service';
import { ContactsController } from './contacts.controller';
import { RandomUserModule }   from '../api/random-user.module';

@Module({
  imports:    [RandomUserModule],
  providers:  [ContactsService],
  controllers:[ContactsController],
})
export class ContactsModule {}
