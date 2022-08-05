import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1659742684065 implements MigrationInterface {
    name = 'initialMigration1659742684065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Ads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "adType" character varying NOT NULL, "title" character varying NOT NULL, "year" integer NOT NULL, "mileage" integer NOT NULL, "price" money NOT NULL, "description" character varying NOT NULL, "vehicleType" character varying NOT NULL, "image" character varying NOT NULL, "gallery" character varying array NOT NULL, "createdOn" date NOT NULL, "userId" uuid, CONSTRAINT "PK_850a2fbe971f8bec92811443d05" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "cpf" character varying NOT NULL, "celphone" character varying NOT NULL, "birthdate" date NOT NULL, "description" character varying NOT NULL, "CEP" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "complement" character varying NOT NULL, "accountType" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Ads" ADD CONSTRAINT "FK_4dad5ef5383ef5a82df09684ee9" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Ads" DROP CONSTRAINT "FK_4dad5ef5383ef5a82df09684ee9"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Ads"`);
    }

}
