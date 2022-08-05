import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Ad from "./Ad";

@Entity("Users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  celphone: string;

  @Column("date")
  birthdate: string;

  @Column()
  description: string;

  @Column()
  CEP: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column("integer")
  number: number;

  @Column()
  complement: string;

  @Column()
  accountType: string;

  @OneToMany(() => Ad, (ad) => ad.user)
  ads: Ad[];

  @Column()
  password: string;
}

export default User;
