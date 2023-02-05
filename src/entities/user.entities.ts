import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { v4 as uuid } from "uuid"
import { Contact } from "./contact.entities";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 60, unique: true })
  email: string;

  @Column({ length: 14, unique: true })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(
    () => Contact,
    (contacts) => contacts.user
  )
  @JoinColumn()
  contacts: Contact[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
