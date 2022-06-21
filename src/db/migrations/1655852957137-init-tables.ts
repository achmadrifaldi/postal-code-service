import { MigrationInterface, QueryRunner } from "typeorm";

export class initTables1655852957137 implements MigrationInterface {
    name = 'initTables1655852957137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "province" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" uuid, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" uuid, "deleted_at" TIMESTAMP WITH TIME ZONE, "deleted_by" uuid, "id" bigint NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_4f461cb46f57e806516b7073659" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "postal_code" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" uuid, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" uuid, "deleted_at" TIMESTAMP WITH TIME ZONE, "deleted_by" uuid, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "postal_code" character varying(255) NOT NULL, "village_id" bigint NOT NULL, CONSTRAINT "PK_79c1ec21abf07b9c4c6da16ec52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "village" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" uuid, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" uuid, "deleted_at" TIMESTAMP WITH TIME ZONE, "deleted_by" uuid, "id" bigint NOT NULL, "name" character varying(255) NOT NULL, "sub_district_id" bigint NOT NULL, CONSTRAINT "PK_3ada8696ae059b2fcf82d5ab579" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub_district" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" uuid, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" uuid, "deleted_at" TIMESTAMP WITH TIME ZONE, "deleted_by" uuid, "id" bigint NOT NULL, "name" character varying(255) NOT NULL, "city_id" bigint NOT NULL, CONSTRAINT "PK_3feea0f1a7cdea813373a32e653" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "city" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" uuid, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" uuid, "deleted_at" TIMESTAMP WITH TIME ZONE, "deleted_by" uuid, "id" bigint NOT NULL, "name" character varying(255) NOT NULL, "province_id" bigint NOT NULL, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "postal_code" ADD CONSTRAINT "FK_f08ecc7ffaaf59646da65c33fee" FOREIGN KEY ("village_id") REFERENCES "village"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "village" ADD CONSTRAINT "FK_958aad05ae5c640e9fa24dc1374" FOREIGN KEY ("sub_district_id") REFERENCES "sub_district"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_district" ADD CONSTRAINT "FK_e2b664135d83e420718dd5e670b" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "FK_efa45f1f32db90d7c6554a353ed" FOREIGN KEY ("province_id") REFERENCES "province"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_efa45f1f32db90d7c6554a353ed"`);
        await queryRunner.query(`ALTER TABLE "sub_district" DROP CONSTRAINT "FK_e2b664135d83e420718dd5e670b"`);
        await queryRunner.query(`ALTER TABLE "village" DROP CONSTRAINT "FK_958aad05ae5c640e9fa24dc1374"`);
        await queryRunner.query(`ALTER TABLE "postal_code" DROP CONSTRAINT "FK_f08ecc7ffaaf59646da65c33fee"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "sub_district"`);
        await queryRunner.query(`DROP TABLE "village"`);
        await queryRunner.query(`DROP TABLE "postal_code"`);
        await queryRunner.query(`DROP TABLE "province"`);
    }

}
