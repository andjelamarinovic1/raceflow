"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitSchema1769520209549 = void 0;
class InitSchema1769520209549 {
    constructor() {
        this.name = 'InitSchema1769520209549';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "clubs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_bb09bd0c8d5238aeaa8f86ee0d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_usertype_enum" AS ENUM('ADMIN', 'ORGANIZER', 'ATHLETE')`);
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('MALE', 'FEMALE')`);
        await queryRunner.query(`CREATE TYPE "public"."users_shirtsize_enum" AS ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userType" "public"."users_usertype_enum" NOT NULL, "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "email" character varying NOT NULL, "dateOfBirth" date, "gender" "public"."users_gender_enum", "weight" double precision, "shirtSize" "public"."users_shirtsize_enum", "city" character varying(100), "country" character varying(100), "clubId" uuid, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "leagues" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(200) NOT NULL, "dateStart" date NOT NULL, "dateEnd" date NOT NULL, "description" text, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_2275e1e3e32e9223298c3a0b514" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_LEAGUE_TITLE" ON "leagues" ("title") `);
        await queryRunner.query(`CREATE TYPE "public"."events_status_enum" AS ENUM('DRAFT', 'PUBLISHED', 'FINISHED')`);
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "leagueId" uuid NOT NULL, "name" character varying(200) NOT NULL, "dateStart" TIMESTAMP WITH TIME ZONE NOT NULL, "dateEnd" TIMESTAMP WITH TIME ZONE NOT NULL, "location" character varying(255) NOT NULL, "description" text, "status" "public"."events_status_enum" NOT NULL DEFAULT 'DRAFT', "latitude" numeric(10,7), "longitude" numeric(10,7), "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_EVENT_LEAGUE_ID" ON "events" ("leagueId") `);
        await queryRunner.query(`CREATE INDEX "IDX_EVENT_NAME" ON "events" ("name") `);
        await queryRunner.query(`CREATE TABLE "races" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "eventId" uuid NOT NULL, "isLeagueRace" boolean NOT NULL DEFAULT false, "name" character varying(200) NOT NULL, "distance" double precision NOT NULL, "dateTimeStart" TIMESTAMP WITH TIME ZONE NOT NULL, "dateTimeEnd" TIMESTAMP WITH TIME ZONE NOT NULL, "checkInLocation" character varying(255), "description" text, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_ba7d19b382156bc33244426c597" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_RACE_EVENT_ID" ON "races" ("eventId") `);
        await queryRunner.query(`CREATE INDEX "IDX_RACE_NAME" ON "races" ("name") `);
        await queryRunner.query(`CREATE TABLE "race_prices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" double precision NOT NULL, "mainCurrency" character varying(10) NOT NULL, "validUntil" date, "isLastOffer" boolean NOT NULL DEFAULT false, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_992230a4a3f6ef5cce8b22d4700" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "raceId" uuid NOT NULL, "racePriceId" uuid NOT NULL, "isPaid" boolean NOT NULL DEFAULT false, "isPaidViaApp" boolean NOT NULL DEFAULT false, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_APPLICATION_USER_ID" ON "applications" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_APPLICATION_RACE_ID" ON "applications" ("raceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_APPLICATION_RACE_PRICE_ID" ON "applications" ("racePriceId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7c847424bb951725774214c5ac6" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_e04e3c1e1f12a28f46aad9a1610" FOREIGN KEY ("leagueId") REFERENCES "leagues"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "races" ADD CONSTRAINT "FK_4ef2502d9fc804c8f081c84c8cf" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_90ad8bec24861de0180f638b9cc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_ca66eef7fdd1a3816e1be65745b" FOREIGN KEY ("raceId") REFERENCES "races"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_a5a0365a880d9db8fdd54003def" FOREIGN KEY ("racePriceId") REFERENCES "race_prices"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_a5a0365a880d9db8fdd54003def"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_ca66eef7fdd1a3816e1be65745b"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_90ad8bec24861de0180f638b9cc"`);
        await queryRunner.query(`ALTER TABLE "races" DROP CONSTRAINT "FK_4ef2502d9fc804c8f081c84c8cf"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_e04e3c1e1f12a28f46aad9a1610"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7c847424bb951725774214c5ac6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_APPLICATION_RACE_PRICE_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_APPLICATION_RACE_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_APPLICATION_USER_ID"`);
        await queryRunner.query(`DROP TABLE "applications"`);
        await queryRunner.query(`DROP TABLE "race_prices"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_RACE_NAME"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_RACE_EVENT_ID"`);
        await queryRunner.query(`DROP TABLE "races"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_EVENT_NAME"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_EVENT_LEAGUE_ID"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TYPE "public"."events_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_LEAGUE_TITLE"`);
        await queryRunner.query(`DROP TABLE "leagues"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_shirtsize_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_usertype_enum"`);
        await queryRunner.query(`DROP TABLE "clubs"`);
    }
}
exports.InitSchema1769520209549 = InitSchema1769520209549;
