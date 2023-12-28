import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { TagController } from '../tag.controller';
import { TagService } from '../tag.service';
import { createTag, tagMock } from './__mock__/tag';

describe('TagController', () => {
  let controller: TagController;
  const mockTagService = createMock<TagService>();
  const id = tagMock.id;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        {
          provide: TagService,
          useValue: mockTagService,
        },
      ],
    }).compile();

    controller = module.get<TagController>(TagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('mothods', () => {
    it('should call service create', () => {
      controller.create(createTag);
      expect(mockTagService.create).toBeCalledWith(createTag);
    });

    it('should call service update', () => {
      controller.update(id, createTag);
      expect(mockTagService.update).toBeCalledWith(id, createTag);
    });

    it('should call service get', () => {
      controller.findOne(id);
      expect(mockTagService.findOne).toBeCalledWith(id);
    });

    it('should call service remove', () => {
      controller.remove(id);
      expect(mockTagService.delete).toBeCalledWith(id);
    });

    it('should call service getAll', () => {
      controller.findAll();
      expect(mockTagService.findAll).toBeCalled();
    });
  });
});
