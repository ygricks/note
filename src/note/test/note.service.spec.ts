import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from '../note.service';
import { createMock } from '@golevelup/ts-jest';
import { Repository, UpdateResult } from 'typeorm';
import { Note } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createNote, noteMock } from './__mock__/note';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('NoteService', () => {
  let service: NoteService;
  const repository = createMock<Repository<Note>>();

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        // test logs when would be used
        // {
        //   provide: Logger,
        //   useValue: createMock<Logger>(),
        // },
        {
          provide: getRepositoryToken(Note),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should call methods', () => {
    const id = noteMock.id;

    it('shold create Note', () => {
      service.create(createNote);
      expect(repository.save).toBeCalledWith(createNote);
    });

    it('shold get one Note with success', () => {
      service.findOne(id);
      expect(repository.findOne).toBeCalledWith({ where: { id } });
    });

    it('shold call findOne Note with reject', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      const error = new HttpException(`Note not found`, HttpStatus.NOT_FOUND);
      await service.findOne(id).catch((e) => {
        expect(e.getStatus()).toEqual(error.getStatus());
        expect(e.message).toEqual(error.message);
        expect(e).toBeInstanceOf(HttpException);
      });
    });

    it('shold get all Note', () => {
      service.findAll();
      expect(repository.find).toBeCalled();
    });

    it('shold update the Note with success', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(noteMock);
      await service.update(id, createNote);
      expect(repository.update).toBeCalled();
      expect(repository.findOne).toBeCalledTimes(2);
    });

    it('should update the Note with error', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      const error = new HttpException(`Note not found`, HttpStatus.NOT_FOUND);
      await service.update(id, createNote).catch((e) => {
        expect(e.getStatus()).toEqual(error.getStatus());
        expect(e.message).toEqual(error.message);
        expect(e).toBeInstanceOf(HttpException);
        expect(repository.findOne).toBeCalledTimes(1);
      });
    });

    it('should update the Note with error 2', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(noteMock);
      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ affected: 0 } as UpdateResult);
      const error = new HttpException(`Note not updated`, HttpStatus.FORBIDDEN);
      await service.update(id, createNote).catch((e) => {
        expect(e.getStatus()).toEqual(error.getStatus());
        expect(e.message).toEqual(error.message);
        expect(e).toBeInstanceOf(HttpException);
        expect(repository.update).toBeCalled();
        expect(repository.findOne).toBeCalledTimes(1);
      });
    });

    it('should delete the Note with success', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(noteMock);
      const remove = await service.delete(id);
      expect(repository.delete).toBeCalledWith({ id });
      expect(remove).toEqual({ deleted: true });
    });

    it('should delete the Note with error', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      const error = new HttpException(`Note not found`, HttpStatus.NOT_FOUND);
      service.delete(id).catch((e) => {
        expect(e.getStatus()).toEqual(error.getStatus());
        expect(e.message).toEqual(error.message);
        expect(repository.findOne).toBeCalledWith({ where: { id } });
      });
    });

    it('should delete the Note with error 2', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(noteMock);
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 0 } as UpdateResult);
      const error = new HttpException(`Note not deleted`, HttpStatus.FORBIDDEN);
      await service.delete(id).catch((e) => {
        expect(e.getStatus()).toEqual(error.getStatus());
        expect(e.message).toEqual(error.message);
        expect(e).toBeInstanceOf(HttpException);
        expect(repository.delete).toBeCalled();
        expect(repository.findOne).toBeCalledTimes(1);
      });
    });
  });
});
