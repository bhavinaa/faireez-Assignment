import { Injectable, OnModuleInit, NotFoundException, Logger } from '@nestjs/common';
import { RandomUserService } from '../api/random-user.service';
import { Contact } from './contacts.interface';
import { ContactQueryDTO } from './dto/query.dto';

@Injectable()
export class ContactsService implements OnModuleInit {
  private readonly logger = new Logger(ContactsService.name);
  private contacts: Contact[] = [];
  private readonly MAX = 100;

  constructor(private readonly randomUser: RandomUserService) {}

  async onModuleInit() {
    this.logger.log(`Initializing with up to ${this.MAX} contacts`);
    this.contacts = await this.randomUser.fetchRandomContacts(this.MAX);
  }

  async getAllContacts(): Promise<Contact[]> {
    if (this.contacts.length === 0) {
      this.contacts = await this.randomUser.fetchRandomContacts(this.MAX);
    }
    return this.contacts;
  }

  getContactById(id: string): Contact {
    const contact = this.contacts.find(c => c.id === id);
    if (!contact) {
      this.logger.warn(`Contact ${id} not found`);
      throw new NotFoundException(`Contact ${id} not found`);
    }
    return contact;
  }

  updateFavoriteStatus(id: string, isFavorite: boolean): Contact {
    const contact = this.getContactById(id);
    contact.isFavorite = isFavorite;
    this.logger.log(`Contact ${id} favorite set to ${isFavorite}`);
    return contact;
  }

  getFilteredContacts(query: ContactQueryDTO): Contact[] {
    let results = [...this.contacts];

    if (query.favorite === 'true') {
      results = results.filter(c => c.isFavorite);
    }

    if (query.sort === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (query.sort === 'email') {
      results.sort((a, b) => a.email.localeCompare(b.email));
    }

    const page  = parseInt(query.page  || '1',  10);
    const limit = parseInt(query.limit || '100', 10);
    const start = (page - 1) * limit;
    return results.slice(start, start + limit);
  }

  async getFavoriteContacts(): Promise<Contact[]> {
    const all = await this.getAllContacts();
    return all.filter(c => c.isFavorite);
  }
}
