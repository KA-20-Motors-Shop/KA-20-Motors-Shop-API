import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1663013385769 implements MigrationInterface {
    name = 'initialMigration1663013385769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Ads" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "Ads" ADD "price" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Ads" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "Ads" ADD "price" money NOT NULL`);
    }

}
