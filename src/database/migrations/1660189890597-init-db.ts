import { MigrationInterface, QueryRunner } from "typeorm";

export class initDb1660189890597 implements MigrationInterface {
    name = 'initDb1660189890597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "province" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_4f461cb46f57e806516b7073659" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "postal_code" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "postal_code" character varying NOT NULL, "village_id" bigint, CONSTRAINT "PK_79c1ec21abf07b9c4c6da16ec52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "village" ("id" bigint NOT NULL, "name" character varying NOT NULL, "sub_district_id" bigint, CONSTRAINT "PK_3ada8696ae059b2fcf82d5ab579" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub_district" ("id" bigint NOT NULL, "name" character varying NOT NULL, "district_id" bigint, CONSTRAINT "PK_3feea0f1a7cdea813373a32e653" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "district" ("id" bigint NOT NULL, "name" character varying NOT NULL, "province_id" integer, CONSTRAINT "PK_ee5cb6fd5223164bb87ea693f1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "postal_code" ADD CONSTRAINT "FK_f08ecc7ffaaf59646da65c33fee" FOREIGN KEY ("village_id") REFERENCES "village"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "village" ADD CONSTRAINT "FK_958aad05ae5c640e9fa24dc1374" FOREIGN KEY ("sub_district_id") REFERENCES "sub_district"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_district" ADD CONSTRAINT "FK_09117c73a9fea05a6bc03b2d160" FOREIGN KEY ("district_id") REFERENCES "district"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "district" ADD CONSTRAINT "FK_20bbec53bfceb008df55035d900" FOREIGN KEY ("province_id") REFERENCES "province"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "district" DROP CONSTRAINT "FK_20bbec53bfceb008df55035d900"`);
        await queryRunner.query(`ALTER TABLE "sub_district" DROP CONSTRAINT "FK_09117c73a9fea05a6bc03b2d160"`);
        await queryRunner.query(`ALTER TABLE "village" DROP CONSTRAINT "FK_958aad05ae5c640e9fa24dc1374"`);
        await queryRunner.query(`ALTER TABLE "postal_code" DROP CONSTRAINT "FK_f08ecc7ffaaf59646da65c33fee"`);
        await queryRunner.query(`DROP TABLE "district"`);
        await queryRunner.query(`DROP TABLE "sub_district"`);
        await queryRunner.query(`DROP TABLE "village"`);
        await queryRunner.query(`DROP TABLE "postal_code"`);
        await queryRunner.query(`DROP TABLE "province"`);
    }

}
