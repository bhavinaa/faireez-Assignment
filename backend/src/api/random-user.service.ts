import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { Contact } from '../contacts/contacts.interface';

@Injectable()
export class RandomUserService {
  constructor(private readonly api: ApiService) {}

  
  async getRandomUser(): Promise<Contact> {
    const all = await this.api.getContacts();
    return all[Math.floor(Math.random() * all.length)];
  }

  
  async fetchRandomContacts(max: number): Promise<Contact[]> {
    const all = await this.api.getContacts();
    return all.slice(0, max);
  }
}
