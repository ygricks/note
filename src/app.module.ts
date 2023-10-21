import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './note/note.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    NoteModule,
    MikroOrmModule.forRoot({
      entities: ['./dist/note/entities'],
      entitiesTs: ['./src/note/entities'],

      user: 'postgres',
      password: 'superpass',
      port: 5490,
      dbName: 'note_db',

      // entities: [`${__dirname}/**/*.entity.{ts,js}`],
      type: 'postgresql',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
