import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { Person } from "./utils/person";

@Entity('banker')
export class Banker extends Person {
  @Column({
    length: 10,
    unique: true,
  })
  employee_number: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
