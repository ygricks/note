import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'pin' })
export class Pin {
  @PrimaryKey()
  id: number;

  @Property({ length: 50 })
  short: string;

  @Property({ length: 20 })
  color: string;

  @Property({ length: 200 })
  message!: string;

  @Property({ columnType: 'timestamp', defaultRaw: `current_timestamp` })
  created_at?: Date;

  constructor(short: string, color: string, message?: string) {
    this.short = short;
    this.color = color;
    if (message) {
      this.message = message;
    }
  }
}
