"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEventLeagueRelation1769522069622 = void 0;
class AddEventLeagueRelation1769522069622 {
    constructor() {
        this.name = 'AddEventLeagueRelation1769522069622';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_e04e3c1e1f12a28f46aad9a1610"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "leagueId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_e04e3c1e1f12a28f46aad9a1610" FOREIGN KEY ("leagueId") REFERENCES "leagues"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_e04e3c1e1f12a28f46aad9a1610"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "leagueId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_e04e3c1e1f12a28f46aad9a1610" FOREIGN KEY ("leagueId") REFERENCES "leagues"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
}
exports.AddEventLeagueRelation1769522069622 = AddEventLeagueRelation1769522069622;
