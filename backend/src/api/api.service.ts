import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { Contact } from '../contacts/contacts.interface';


export interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  picture: {
    thumbnail: string;
  };
}

export interface RandomUserApiResponse {
  results: RandomUser[];
}

@Injectable()
export class ApiService {
  private readonly logger = new Logger(ApiService.name);
  private readonly apiUrl = 'https://randomuser.me/api/?results=300';

  async getContacts(): Promise<Contact[]> {
    this.logger.log('Fetching contacts from RandomUser API');
    try {
      const response: AxiosResponse<RandomUserApiResponse> = 
        await axios.get<RandomUserApiResponse>(this.apiUrl);
      
      return response.data.results.map<Contact>((u: RandomUser, i: number) => ({
        id:         i.toString(),
        name:       `${u.name.first} ${u.name.last}`,
        email:      u.email,
        phone:      u.phone,
        picture:    u.picture.thumbnail,
        isFavorite: false,
      }));
    } catch (err) {
      this.logger.error('Failed to fetch from RandomUser API', err.stack);
      throw err;
    }
  }
}
