import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './note/note.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import databaseConfig from './config/database.config';
import { TagModule } from './note/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotetagModule } from './note/notetag.module';

@Module({
  imports: [
    NoteModule,
    TagModule,
    NotetagModule,
    ConfigModule.forRoot({
      load: [configuration, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: ['./dist/note/entities/*.entity.js'],
        entitiesTs: ['./src/note/entities*.entity.ts'],
        // create entity in DB
        // synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
