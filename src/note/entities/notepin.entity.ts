import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'notepin' })
export class Notepin {
  @Column({ nullable: false })
  @PrimaryColumn()
  note_id: number;

  @Column({ nullable: false })
  @PrimaryColumn()
  pin_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  constructor(order: number, product: number) {
    this.note_id = order;
    this.pin_id = product;
  }
}
