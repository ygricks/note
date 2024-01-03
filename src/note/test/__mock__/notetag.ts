import { NotetagDto } from 'src/note/dto/notetag.dto';
import { Notetag } from 'src/note/entities';
import { noteMock } from './note';
import { tagMock } from './tag';

export const createNotetagMock: NotetagDto = {
  note_id: noteMock.id,
  tag_id: tagMock.id,
};

export const notetagMock: Notetag = {
  ...createNotetagMock,
  created_at: new Date('2011-02-03T12:13:14Z'),
};
