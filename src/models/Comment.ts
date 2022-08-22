import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import User from "./User";
import Ad from "./Ad";

@Entity("Comments")
class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  description: string;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Ad, { eager: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "ad_id" })
  ad: Ad;
}

export default Comment;
