import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1675426703091 implements MigrationInterface {
    name = 'createTables1675426703091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdm"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "primary_email" character varying(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "second_email" character varying(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "primary_phone" character varying(14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "second_phone" character varying(14) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "second_phone"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "primary_phone"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "second_email"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "primary_email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdm" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
    }

}
