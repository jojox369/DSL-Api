import {MigrationInterface, QueryRunner} from "typeorm";

export class ListUserRelation1604213452282 implements MigrationInterface {
    name = 'ListUserRelation1604213452282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "total" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_list"("id", "total", "userId") SELECT "id", "total", "userId" FROM "list"`);
        await queryRunner.query(`DROP TABLE "list"`);
        await queryRunner.query(`ALTER TABLE "temporary_list" RENAME TO "list"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "password") SELECT "id", "username", "password" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "total" integer NOT NULL, "user_id" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_list"("id", "total", "user_id") SELECT "id", "total", "userId" FROM "list"`);
        await queryRunner.query(`DROP TABLE "list"`);
        await queryRunner.query(`ALTER TABLE "temporary_list" RENAME TO "list"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "password") SELECT "id", "username", "password" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "total" integer NOT NULL, "user_id" integer, CONSTRAINT "FK_a842f768ec87a346b0ee61fabba" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_list"("id", "total", "user_id") SELECT "id", "total", "user_id" FROM "list"`);
        await queryRunner.query(`DROP TABLE "list"`);
        await queryRunner.query(`ALTER TABLE "temporary_list" RENAME TO "list"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" RENAME TO "temporary_list"`);
        await queryRunner.query(`CREATE TABLE "list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "total" integer NOT NULL, "user_id" integer)`);
        await queryRunner.query(`INSERT INTO "list"("id", "total", "user_id") SELECT "id", "total", "user_id" FROM "temporary_list"`);
        await queryRunner.query(`DROP TABLE "temporary_list"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "password") SELECT "id", "username", "password" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "list" RENAME TO "temporary_list"`);
        await queryRunner.query(`CREATE TABLE "list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "total" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "list"("id", "total", "userId") SELECT "id", "total", "user_id" FROM "temporary_list"`);
        await queryRunner.query(`DROP TABLE "temporary_list"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "password") SELECT "id", "username", "password" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "list" RENAME TO "temporary_list"`);
        await queryRunner.query(`CREATE TABLE "list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "total" integer NOT NULL, "userId" integer, CONSTRAINT "FK_46ded14b26382088c9f032f8953" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "list"("id", "total", "userId") SELECT "id", "total", "userId" FROM "temporary_list"`);
        await queryRunner.query(`DROP TABLE "temporary_list"`);
    }

}
