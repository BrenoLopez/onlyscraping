import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('products',(table)=>{
        table.increments('id').primary()
        table.string('description');

    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema
      .dropTable('products')
}

