import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pin' })
export class Pin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  short: string;

  @Column({ length: 20, nullable: true })
  color?: string;

  @Column({ length: 200, nullable: true })
  message?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  constructor(short: string, message?: string, color?: string) {
    this.short = short;
    if (color) {
      this.color = color;
    }
    if (message) {
      this.message = message;
    }
  }
}
