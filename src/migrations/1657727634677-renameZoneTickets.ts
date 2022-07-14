import { MigrationInterface, QueryRunner } from "typeorm";

export class renameZoneTickets1657727634677 implements MigrationInterface {
    name = 'renameZoneTickets1657727634677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zone" RENAME COLUMN "total_tickers" TO "total_tickets"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zone" RENAME COLUMN "total_tickets" TO "total_tickers"`);
    }

}
