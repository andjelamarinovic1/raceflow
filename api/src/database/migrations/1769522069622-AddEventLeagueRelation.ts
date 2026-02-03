import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEventLeagueRelation1769522069622 implements MigrationInterface {
    name = 'AddEventLeagueRelation1769522069622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_e04e3c1e1f12a28f46aad9a1610"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "leagueId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_e04e3c1e1f12a28f46aad9a1610" FOREIGN KEY ("leagueId") REFERENCES "leagues"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_e04e3c1e1f12a28f46aad9a1610"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "leagueId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_e04e3c1e1f12a28f46aad9a1610" FOREIGN KEY ("leagueId") REFERENCES "leagues"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
