import { MigrationInterface, QueryRunner } from "typeorm";

export class removeDuplicates21657651238893 implements MigrationInterface {
    name = 'removeDuplicates21657651238893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zone" DROP COLUMN "event_id"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "zone_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" ADD "zone_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "zone" ADD "event_id" character varying NOT NULL`);
    }

}
