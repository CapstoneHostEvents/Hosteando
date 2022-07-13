import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Unique } from "typeorm"
// import { User } from "./User"

@Entity("event")

class Event {

  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column()
  name: string

  @Column()
  description: string

  @Column()
  date: Date

  @CreateDateColumn()
  created_by: string

  @CreateDateColumn()
  created_at: Date

  // @OneToMany(type => User, user => user.student) user: user[]
}

export { Event }