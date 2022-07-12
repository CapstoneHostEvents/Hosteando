import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { v4 as uuid } from "uuid";
import { Event } from "./Event";
import { Ticket } from "./Tickets";

@Entity("zone")
export class Zone {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  total_tickers: number;

  @ManyToOne(() => Event, (event) => event.zones)
  event: Event;

  @OneToMany(() => Ticket, (ticket) => ticket.zone)
  ticket: Ticket[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
