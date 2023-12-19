import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'note' })
export class Note {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  short!: string;

  @Column({ length: 200, nullable: true })
  message: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  created_at?: Date;

  // pins: number[];
  // @AfterLoad()
  // afterLoad() {
  //   this.pins = [1, 2, 3];
  // }

  constructor(short: string, message: string) {
    this.short = short;
    if (message) {
      this.message = message;
    }
  }
}
