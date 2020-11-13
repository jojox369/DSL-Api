import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ListProduct1605210294257 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'list_product',
        columns: [
          {
            name: 'list_id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'product_id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'amount',
            type: 'integer',
            isNullable: false,
          },

          {
            name: 'price',
            type: 'real',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_list',
            columnNames: ['list_id'],
            referencedTableName: 'list',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_product',
            columnNames: ['product_id'],
            referencedTableName: 'product',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('list_product');
  }
}
