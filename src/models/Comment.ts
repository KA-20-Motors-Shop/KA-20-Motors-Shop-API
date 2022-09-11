import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from "typeorm";
import User from "./User";
import Ad from "./Ad";

@Entity("Comments")
class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("date")
  createdOn: Date;

  @Column()
  description: string;

  @ManyToOne(() => Ad, (ad) => ad.comments)
  @JoinColumn({ name: "ad_id" })
  ad: Ad;

  @ManyToOne(type => User, user => user.comments)
  @JoinColumn({name: "user_id"})
  user: User
}

export default Comment;
