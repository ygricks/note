import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TagService } from '../tag.service';
import { Notetag, Tag } from '../entities';
import { createTag, tagMock } from './__mock__/tag';
import { notetagMock } from './__mock__/notetag';

describe('TagService', () => {
  let service: TagService;
  const repository = createMock<Repository<Tag>>();
  const notetagRepository = createMock<Repository<Notetag>>();

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        // test logs when would be used
        // {
        //   provide: Logger,
        //   useValue: createMock<Logger>(),
        // },
        {
          provide: getRepositoryToken(Tag),
          useValue: repository,
        },
        {
          provide: getRepositoryToken(Notetag),
          useValue: notetagRepository,
        },
      ],
    }).compile();

    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should call methods', () => {
    const id = tagMock.id;

    it('should create Tag', () => {
      service.create(createTag);
      expect(repository.save).toBeCalledWith(createTag);
    });

    it('should get one Tag with success', () => {
      service.findOne(id);
      expect(repository.findOne).toBeCalledWith({ where: { id } });
    });

    it('should call findOne Tag with reject', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      const error = new HttpException(`Tag not found`, HttpStatus.NOT_FOUND);
      await service.findOne(id).catch((e) => {
        expect(e.getStatus()).toEqual(error.getStatus());
        expect(e.message).toEqual(error.message);
        expect(e).toBeInstanceOf(HttpException);
      });
    });

    it('should get all Tag', () => {
      service.findAll();
      expect(repository.find).toBeCalled();
    });

    it('should update the Tag with success', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(tagMock);
      await service.update(id, createTag);
      expect(repository.update).toBeCalled();
      expect(repository.findOne).toBeCalledTimes(2);
    });

    it('should update the Tag with error', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      const error = new HttpException(`Tag not found`, HttpStatus.NOT_FOUND);
      await service.update(id, createTag).catch((e) => {
        expect(e.getStatus()).toEqual(error.getStatus());
        expect(e.message).toEqual(error.message);
        expect(e).toBeInstanceOf(HttpException);
        expect(repository.findOne).toBeCalledTimes(1);
      });
    });

    it('should update the Tag with error 2', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(tagMock);
      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ affected: 0 } as UpdateResult);
      const error = new HttpException(`Tag not updated`, HttpStatus.FORBIDDEN);
      await service.update(id, createTag).catch((e) => {
        expect(e.getStatus()).toEqual(error.getStatus());
        expect(e.message).toEqual(error.message);
        expect(e).toBeInstanceOf(HttpException);
        expect(repository.update).toBeCalled();
        expect(repository.findOne).toBeCalledTimes(1);
      });
    });

    it('should delete the Tag with success', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(tagMock);
      jest.spyOn(notetagRepository, 'find').mockResolvedValue([]);
      const remove = await service.delete(id);
      expect(repository.delete).toBeCalledWith({ id });
      expect(remove).toEqual({ deleted: true });
    });

    it('should delete the Tag with error', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      const error = new HttpException(`Tag not found`, HttpStatus.NOT_FOUND);
      service.delete(id).catch((e) => {
        expect(e.getStatus()).toEqual(error.getStatus());
        expect(e.message).toEqual(error.message);
        expect(repository.findOne).toBeCalledWith({ where: { id } });
      });
    });

    it('should delete the Tag with error 2', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(tagMock);
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 0 } as UpdateResult);
      const error = new HttpException(`Tag not deleted`, HttpStatus.FORBIDDEN);
      await service.delete(id).catch((e) => {
        expect(e.getStatus()).toEqual(error.getStatus());
        expect(e.message).toEqual(error.message);
        expect(e).toBeInstanceOf(HttpException);
        expect(repository.delete).toBeCalled();
        expect(repository.findOne).toBeCalledTimes(1);
      });
    });

    it('should delete the Tag with error 3', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(tagMock);
      jest.spyOn(notetagRepository, 'find').mockResolvedValue([notetagMock]);

      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 0 } as UpdateResult);
      const error = new HttpException(
        `Tag is hooked to some notes`,
        HttpStatus.CONFLICT,
      );
      await service.delete(id).catch((e) => {
        expect(e.getStatus()).toEqual(error.getStatus());
        expect(e.message).toEqual(error.message);
        expect(e).toBeInstanceOf(HttpException);
        expect(notetagRepository.find).toBeCalledTimes(1);
      });
    });
  });
});
