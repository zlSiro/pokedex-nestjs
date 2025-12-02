import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  constructor() {}

  executeSeed() {
    return 'This action seeds the database';
  }
}
