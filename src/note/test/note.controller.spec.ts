import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from '../note.controller';
import { NoteService } from '../note.service';
import { createMock } from '@golevelup/ts-jest';
import { createNoteMock, noteMock } from './__mock__/note';

describe('NoteController', () => {
  let controller: NoteController;
  const mockNoteService = createMock<NoteService>();
  const id = noteMock.id;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        {
          provide: NoteService,
          useValue: mockNoteService,
        },
      ],
    }).compile();

    controller = module.get<NoteController>(NoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('mothods', () => {
    it('should call service create', () => {
      controller.create(createNoteMock);
      expect(mockNoteService.create).toBeCalledWith(createNoteMock);
    });

    it('should call service update', () => {
      controller.update(id, createNoteMock);
      expect(mockNoteService.update).toBeCalledWith(id, createNoteMock);
    });

    it('should call service get', () => {
      controller.findOne(id);
      expect(mockNoteService.findOne).toBeCalledWith(id);
    });

    it('should call service remove', () => {
      controller.remove(id);
      expect(mockNoteService.delete).toBeCalledWith(id);
    });

    it('should call service getAll', () => {
      controller.findAll();
      expect(mockNoteService.findAll).toBeCalled();
    });
  });
});
