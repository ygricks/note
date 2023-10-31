import { Check, Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'pin' })
export class Pin {
  @PrimaryKey()
  id: number;

  @Property({ length: 50 })
  @Check({ expression: 'short >= 3' })
  short: string;

  @Property({ length: 20 })
  @Check({ expression: 'color >= 3' })
  color: string;

  @Property({ length: 200 })
  @Check({ expression: 'message >= 3' })
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
