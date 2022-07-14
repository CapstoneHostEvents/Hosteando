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
import { User } from "./User";
import { Zone } from "./Zone";

@Entity("ticket")
export class Ticket {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(() => User, (user) => user.ticket)
  user: User;

  @ManyToOne(() => Zone, (zone) => zone.ticket)
  zone: Zone;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
