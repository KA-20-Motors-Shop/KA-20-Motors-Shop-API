import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1663431821932 implements MigrationInterface {
    name = 'InitialMigration1663431821932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" date NOT NULL, "description" character varying NOT NULL, "ad_id" uuid, "user_id" uuid, CONSTRAINT "PK_91e576c94d7d4f888c471fb43de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "cpf" character varying NOT NULL, "celphone" character varying NOT NULL, "birthdate" date NOT NULL, "description" character varying NOT NULL, "CEP" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "complement" character varying NOT NULL, "accountType" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Ads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "adType" character varying NOT NULL, "title" character varying NOT NULL, "year" integer NOT NULL, "mileage" integer NOT NULL, "price" numeric NOT NULL, "description" character varying NOT NULL, "vehicleType" character varying NOT NULL, "image" character varying NOT NULL, "gallery" character varying array NOT NULL, "createdOn" date NOT NULL, "isActive" boolean NOT NULL, "user_id" uuid, CONSTRAINT "PK_850a2fbe971f8bec92811443d05" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Comments" ADD CONSTRAINT "FK_c3b47144173204a52104afb705b" FOREIGN KEY ("ad_id") REFERENCES "Ads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Comments" ADD CONSTRAINT "FK_22ec3485cde8dfcd915922addc1" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Ads" ADD CONSTRAINT "FK_d9fa858eb1290ab43d3e2575fca" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Ads" DROP CONSTRAINT "FK_d9fa858eb1290ab43d3e2575fca"`);
        await queryRunner.query(`ALTER TABLE "Comments" DROP CONSTRAINT "FK_22ec3485cde8dfcd915922addc1"`);
        await queryRunner.query(`ALTER TABLE "Comments" DROP CONSTRAINT "FK_c3b47144173204a52104afb705b"`);
        await queryRunner.query(`DROP TABLE "Ads"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Comments"`);
    }

}
