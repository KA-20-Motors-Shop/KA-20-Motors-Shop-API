import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import User from "./User";

@Entity("Ads")
class Ad {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  adType: string;

  @Column()
  title: string;

  @Column("integer")
  year: number;

  @Column("integer")
  mileage: number;

  @Column("money")
  price: number;

  @Column()
  description: string;

  @Column()
  vehicleType: string;

  @Column()
  image: string;

  @Column({ array: true })
  gallery: string;

  @Column("date")
  createdOn: string;

  @Column()
  isActive: boolean;

  @ManyToOne(() => User, { eager: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.ad)
  comments: Comment[];
}

export default Ad;
