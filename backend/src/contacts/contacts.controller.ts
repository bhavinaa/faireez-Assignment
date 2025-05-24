import {
  Controller, Get, Param, Query, Body,
  UsePipes, ValidationPipe, Post, Logger
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './contacts.interface';
import { ContactQueryDTO } from './dto/query.dto';
import { FavoriteDTO } from './dto/favorite.dto';

@Controller('contacts')
@UsePipes(new ValidationPipe({ transform: true }))
export class ContactsController {
  private readonly logger: Logger;
  constructor(private readonly svc: ContactsService) {
    this.logger = new Logger('ContactsService');
  }

  /** GET /contacts */
  @Get()
  async list(@Query() query: ContactQueryDTO): Promise<Contact[]> {
    await this.svc.getAllContacts();
    return this.svc.getFilteredContacts(query);
  }

  /** GET /contacts/:id */
  @Get(':id')
  getById(@Param('id') id: string): Contact {
    return this.svc.getContactById(id);
  }

  
  @Post('favorite/:id')
  toggleFavorite(
    @Param('id') id: string,
    @Body() body: FavoriteDTO,
  ): Contact {
    //this.logger.log(`updateFavoriteStatus() - id: ${id}, isFavorite: ${body.isFavorite}`);
    this.logger.log(`updateFavoriteStatus() -  isFavorite: ${body.isFavorite}`);
    return this.svc.updateFavoriteStatus(id, body.isFavorite);
  }

  /** GET /contacts/favorites */
  @Get('favorites')
  getFavorites(): Promise<Contact[]> {
    return this.svc.getFavoriteContacts();
  }
}
