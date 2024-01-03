import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { DeleteResult, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { noteMock } from './__mock__/note';
import { HttpException, HttpStatus } from '@nestjs/common';
import { NotetagService } from '../notetag.service';
import { createNotetagMock } from './__mock__/notetag';
import { Note, Notetag, Tag } from '../entities';
import { tagMock } from './__mock__/tag';

describe('NotetagService', () => {
  let service: NotetagService;
  const notetagRepository = createMock<Repository<Notetag>>();
  const noteRepository = createMock<Repository<Note>>();
  const tagRepository = createMock<Repository<Tag>>();

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotetagService,
        // test logs when would be used
        // {
        //   provide: Logger,
        //   useValue: createMock<Logger>(),
        // },
        {
          provide: getRepositoryToken(Notetag),
          useValue: notetagRepository,
        },
        {
          provide: getRepositoryToken(Note),
          useValue: noteRepository,
        },
        {
          provide: getRepositoryToken(Tag),
          useValue: tagRepository,
        },
      ],
    }).compile();

    service = module.get<NotetagService>(NotetagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should call methods', () => {
    it('should create Note', async () => {
      jest.spyOn(noteRepository, 'findOne').mockResolvedValue(noteMock);
      jest.spyOn(tagRepository, 'findOne').mockResolvedValue(tagMock);
      await service.create(createNotetagMock);
      expect(notetagRepository.save).toBeCalledWith(createNotetagMock);
    });

    it('should create Notetag with error #1', async () => {
      jest.spyOn(noteRepository, 'findOne').mockResolvedValue(noteMock);
      jest.spyOn(tagRepository, 'findOne').mockResolvedValue(null);
      service.create(createNotetagMock).catch((e) => {
        expect(e.getStatus()).toEqual(HttpStatus.NOT_FOUND);
        expect(e.message).toEqual('Tag not found');
      });
    });

    it('should create Notetag with error #2', async () => {
      jest.spyOn(noteRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(tagRepository, 'findOne').mockResolvedValue(tagMock);
      service.create(createNotetagMock).catch((e) => {
        expect(e.getStatus()).toEqual(HttpStatus.NOT_FOUND);
        expect(e.message).toEqual('Note not found');
      });
    });

    it('should create Notetag with error #3', async () => {
      jest.spyOn(noteRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(tagRepository, 'findOne').mockResolvedValue(null);
      service.create(createNotetagMock).catch((e) => {
        expect(e.getStatus()).toEqual(HttpStatus.NOT_FOUND);
        expect(e.message).toEqual('Note & Tag not found');
      });
    });

    // it('something', async () => {
    //   const tagError = new HttpException('Tag not found', HttpStatus.NOT_FOUND);
    //   service.create(createNotetagMock).catch((e) => {
    //     expect(e.getStatus()).toEqual(HttpStatus.NOT_FOUND);
    //   });
    //   expect(async () => {
    //     await service.create(createNotetagMock);
    //   }).rejects.toThrow();
    // });

    it('should delete the Note with success', async () => {
      jest
        .spyOn(notetagRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as DeleteResult);
      const remove = await service.delete(createNotetagMock);
      expect(notetagRepository.delete).toBeCalledWith(createNotetagMock);
      expect(remove).toEqual({ deleted: true });
    });

    it('should delete the Note with error', async () => {
      jest
        .spyOn(notetagRepository, 'delete')
        .mockResolvedValue({ affected: 0 } as DeleteResult);
      jest.spyOn(notetagRepository, 'findOne').mockResolvedValue(null);
      const error = new HttpException(
        `Notetag not deleted`,
        HttpStatus.FORBIDDEN,
      );
      service.delete(createNotetagMock).catch((e) => {
        expect(e.getStatus()).toEqual(error.getStatus());
        expect(e.message).toEqual(error.message);
      });
    });
  });
});
