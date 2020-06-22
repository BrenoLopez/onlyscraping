import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('prices',(table)=>{
        table.increments('id').primary();
        table.float('price')
        table.date('date')
        table.string('store')
        table.integer('products_id').unsigned();
        table.foreign('products_id').references('id').inTable('products').onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema
    .dropTable('prices')
}

