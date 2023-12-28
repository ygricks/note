import { CreateTagDto } from 'src/note/dto/create-tag.dto';
import { Tag } from 'src/note/entities';

export const createTag: CreateTagDto = {
  short: 'some short',
};

export const tagMock: Tag = {
  id: 12390,
  short: 'something',
  color: 'blue',
  message: null,
  created_at: new Date('2011-02-03T12:13:14Z'),
};
