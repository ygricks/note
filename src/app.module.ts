import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './note/note.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    NoteModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        entities: ['./dist/note/entities'],
        // entities: [`${__dirname}/**/*.entity.{ts,js}`],
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
