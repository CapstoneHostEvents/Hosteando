import { MigrationInterface, QueryRunner } from "typeorm";

export class removeDuplicates1657651052336 implements MigrationInterface {
    name = 'removeDuplicates1657651052336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "created_by"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "created_by" character varying NOT NULL`);
    }

}
