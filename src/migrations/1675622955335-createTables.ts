import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1675622955335 implements MigrationInterface {
    name = 'createTables1675622955335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id")`);
    }

}
