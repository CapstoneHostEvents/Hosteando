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

@Entity("user")
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  isAdm: boolean;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  ticket: Ticket[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
