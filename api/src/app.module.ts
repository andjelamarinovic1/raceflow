import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './modules/events/events.module';
import { Application } from './database/entities/application.entity';
import { Club } from './database/entities/club.entity';
import { League } from './database/entities/league.entity';
import { RacePrice } from './database/entities/race-price.entity';
import { Race } from './database/entities/race.entity';
import { User } from './database/entities/user.entity';
import { Event } from './database/entities/event.entity';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [Application, Club, Event, League, RacePrice, Race, User],
      // migrations: ['src/database/migrations/*.ts'],
      synchronize: true, // SAMO za razvoj!
    }),
    // MODULES
    EventsModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
