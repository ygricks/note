import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './note/note.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import databaseConfig from './config/database.config';
import { PinModule } from './note/pin.module';

@Module({
  imports: [
    NoteModule,
    PinModule,
    ConfigModule.forRoot({
      load: [configuration, databaseConfig],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        entities: ['./dist/note/entities'],
        entitiesTs: ['./src/note/entities'],

        type: 'postgresql',
        host: configService.get('database.host'),
        user: configService.get('database.user'),
        password: configService.get('database.password'),
        port: configService.get('database.port'),
        dbName: configService.get('database.name'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
