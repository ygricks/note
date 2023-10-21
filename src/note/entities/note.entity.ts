import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Note {
  @PrimaryKey()
  id!: number;

  @Property()
  short!: string;

  @Property()
  message!: string;

  @Property()
  created_at?: Date;

  constructor(short: string, message: string) {
    this.short = short;
    if (message) {
      this.message = message;
    }
  }
}
