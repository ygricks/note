import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { NoteTagController } from '../notetag.controller';
import { createNotetagMock } from './__mock__/notetag';
import { NotetagService } from '../notetag.service';

describe('NotetagController', () => {
  let controller: NoteTagController;
  const mockNoteService = createMock<NotetagService>();

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteTagController],
      providers: [
        {
          provide: NotetagService,
          useValue: mockNoteService,
        },
      ],
    }).compile();

    controller = module.get<NoteTagController>(NoteTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('mothods', () => {
    it('should call service create', () => {
      controller.create(createNotetagMock);
      expect(mockNoteService.create).toBeCalledWith(createNotetagMock);
    });

    it('should call service remove', () => {
      controller.remove(createNotetagMock);
      expect(mockNoteService.delete).toBeCalledWith(createNotetagMock);
    });

    // it('should call service getAll', () => {
    //   controller.findAll();
    //   expect(mockNoteService.findAll).toBeCalled();
    // });
  });
});
