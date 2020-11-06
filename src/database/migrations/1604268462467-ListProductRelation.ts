import {MigrationInterface, QueryRunner} from "typeorm";

export class ListProductRelation1604268462467 implements MigrationInterface {
    name = 'ListProductRelation1604268462467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "password") SELECT "id", "username", "password" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "list_product" ("product_id" integer NOT NULL, "list_id" integer NOT NULL, PRIMARY KEY ("product_id", "list_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_520bf16180f4f7c3afe0f491c4" ON "list_product" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_aeee80577e97ebf9ca5f0e334a" ON "list_product" ("list_id") `);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "password") SELECT "id", "username", "password" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`DROP INDEX "IDX_520bf16180f4f7c3afe0f491c4"`);
        await queryRunner.query(`DROP INDEX "IDX_aeee80577e97ebf9ca5f0e334a"`);
        await queryRunner.query(`CREATE TABLE "temporary_list_product" ("product_id" integer NOT NULL, "list_id" integer NOT NULL, CONSTRAINT "FK_520bf16180f4f7c3afe0f491c41" FOREIGN KEY ("product_id") REFERENCES "list" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_aeee80577e97ebf9ca5f0e334a8" FOREIGN KEY ("list_id") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("product_id", "list_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_list_product"("product_id", "list_id") SELECT "product_id", "list_id" FROM "list_product"`);
        await queryRunner.query(`DROP TABLE "list_product"`);
        await queryRunner.query(`ALTER TABLE "temporary_list_product" RENAME TO "list_product"`);
        await queryRunner.query(`CREATE INDEX "IDX_520bf16180f4f7c3afe0f491c4" ON "list_product" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_aeee80577e97ebf9ca5f0e334a" ON "list_product" ("list_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_aeee80577e97ebf9ca5f0e334a"`);
        await queryRunner.query(`DROP INDEX "IDX_520bf16180f4f7c3afe0f491c4"`);
        await queryRunner.query(`ALTER TABLE "list_product" RENAME TO "temporary_list_product"`);
        await queryRunner.query(`CREATE TABLE "list_product" ("product_id" integer NOT NULL, "list_id" integer NOT NULL, PRIMARY KEY ("product_id", "list_id"))`);
        await queryRunner.query(`INSERT INTO "list_product"("product_id", "list_id") SELECT "product_id", "list_id" FROM "temporary_list_product"`);
        await queryRunner.query(`DROP TABLE "temporary_list_product"`);
        await queryRunner.query(`CREATE INDEX "IDX_aeee80577e97ebf9ca5f0e334a" ON "list_product" ("list_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_520bf16180f4f7c3afe0f491c4" ON "list_product" ("product_id") `);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "password") SELECT "id", "username", "password" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`DROP INDEX "IDX_aeee80577e97ebf9ca5f0e334a"`);
        await queryRunner.query(`DROP INDEX "IDX_520bf16180f4f7c3afe0f491c4"`);
        await queryRunner.query(`DROP TABLE "list_product"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "password") SELECT "id", "username", "password" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
