import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";

import Comment from "./Comment";
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

  @Column()
  password: string;

  @OneToMany(() => Ad, (ad) => ad.user)
  ads: Ad[];

  @OneToMany(() => Comment, comment => comment.user, {
    eager:true
  })
  comments: Comment[];
}

export default User;
