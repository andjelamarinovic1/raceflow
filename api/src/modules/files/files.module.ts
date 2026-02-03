// src/users/users.module.ts
import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
// import { Event } from '../../database/entities/event.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([Event])],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
