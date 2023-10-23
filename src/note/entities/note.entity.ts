import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'note' })
export class Note {
  @PrimaryKey()
  id!: number;

  @Property({ length: 50 })
  short!: string;

  @Property({ length: 200 })
  message!: string;

  @Property({ columnType: 'timestamp', defaultRaw: `current_timestamp` })
  created_at?: Date;

  constructor(short: string, message: string) {
    this.short = short;
    if (message) {
      this.message = message;
    }
  }
}
