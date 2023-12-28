import { CreateNoteDto } from 'src/note/dto/create-note.dto';
import { Note } from 'src/note/entities';

export const createNote: CreateNoteDto = {
  short: 'some short',
};

export const noteMock: Note = {
  id: 12390,
  short: 'something',
  message: null,
  created_at: new Date('2000-01-02T11:12:13Z'),
};
