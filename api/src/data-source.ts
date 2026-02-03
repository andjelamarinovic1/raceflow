import * as dotenv from 'dotenv';
dotenv.config();

// src/data-source.ts
import { DataSource } from 'typeorm';
import { User } from './database/entities/user.entity';
import { Application } from './database/entities/application.entity';
import { Club } from './database/entities/club.entity';
import { Event } from './database/entities/event.entity';
import { League } from './database/entities/league.entity';
import { RacePrice } from './database/entities/race-price.entity';
import { Race } from './database/entities/race.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD + '',
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  logging: true,
  entities: [Application, Club, Event, League, RacePrice, Race, User],
  migrations: ['src/database/migrations/*.ts'],
});
