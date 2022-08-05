import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
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

  @Column("string", { array: true })
  gallery: string[];

  @Column("date")
  createdOn: string;

  @ManyToOne(() => User, (user) => user.ads)
  user: User;
}

export default Ad;
