import { IsNotEmpty } from 'class-validator';

export class NotetagDto {
  @IsNotEmpty()
  note_id: number;

  @IsNotEmpty()
  tag_id: number;
}
