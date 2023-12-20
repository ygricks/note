import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'notetag' })
export class Notetag {
  @Column({ nullable: false })
  @PrimaryColumn()
  note_id: number;

  @Column({ nullable: false })
  @PrimaryColumn()
  tag_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  constructor(order: number, product: number) {
    this.note_id = order;
    this.tag_id = product;
  }
}
