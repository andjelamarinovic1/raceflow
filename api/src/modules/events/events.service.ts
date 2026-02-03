// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../database/entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private repository: Repository<Event>,
  ) {}

  create(userData: Partial<Event>) {
    const user = this.repository.create(userData);
    return this.repository.save(user);
  }

  findAll() {
    return this.repository.find({
      select: ['id', 'name', 'dateStart', 'dateEnd', 'location', 'description'],
    });
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: number, updateData: Partial<Event>) {
    return this.repository.update(id, updateData);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}
