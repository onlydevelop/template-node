
const items_table = async (knex) => {
    await knex.schema.createTable('items', (table) => { 
        table.increments();
        table.string('name');
        table.decimal('price',11,2);
        table.timestamp('createdAt').defaultTo(knex.fn.now());    
        table.timestamp('updatedAt').defaultTo(knex.fn.now());    
    });
};

const users_table = async (knex) => {
    await knex.schema.createTable('users', (table) => { 
        table.increments();
        table.string('name');
        table.string('address');
        table.timestamp('createdAt').defaultTo(knex.fn.now());    
        table.timestamp('updatedAt').defaultTo(knex.fn.now());    
    });
};

const carts_table = async (knex) => {
    await knex.schema.createTable('carts', (table) => { 
        table.increments();
        table.bigInteger('userId');
        table.foreign('userId').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
        table.bigInteger('itemId');
        table.foreign('itemId').references('items.id').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('quantity');
        table.timestamp('createdAt').defaultTo(knex.fn.now());    
        table.timestamp('updatedAt').defaultTo(knex.fn.now());    
    });
};

exports.up = async (knex) => {
    await items_table(knex);
    await users_table(knex);
    await carts_table(knex);
};

exports.down = async (knex) => {
    await knex.schema.dropTable('carts');
    await knex.schema.dropTable('users');
    await knex.schema.dropTable('items');
};
