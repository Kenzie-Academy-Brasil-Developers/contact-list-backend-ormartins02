import { Exclude } from "class-transformer";
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

  @Column({ length: 120 })
  @Exclude()
  password: string;

  @Column({ default: false })
  isAdm: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(
    () => Contact,
    (contacts) => contacts.user, {onDelete: "SET NULL", eager: true}
  )
  contacts: Contact[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
