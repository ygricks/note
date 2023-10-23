import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core';
import { Note } from './note.entity';
import { Pin } from './pin.entity';

@Entity({ tableName: 'notepin' })
export class Notepin {
  @ManyToOne({ primary: true, fieldName: 'note_id' })
  note: Note;

  @ManyToOne({ primary: true, fieldName: 'pin_id' })
  pin: Pin;

  @Property({ columnType: 'timestamp', defaultRaw: `current_timestamp` })
  created_at: Date;

  [PrimaryKeyType]: [number, number];

  constructor(order: Note, product: Pin) {
    this.note = order;
    this.pin = product;
  }
}
