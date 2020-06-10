require('dotenv').config();

const knex = require('knex');
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});
console.log('knex installed correctly');
console.log(process.env.DB_URL);

// knexInstance
//   .select('product_id', 'name', 'price', ' category')
//   .from('amazong_products')
//   .where('name', 'ILIKE', `%${searchTerm}%`)
//   .then((result) => console.log(result));

function searchByProductName(searchTerm) {
  knexInstance
    .select('product_id', 'name', 'price', ' category')
    .from('amazong_products')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then((result) => console.log(result));
}

searchByProductName('holo');
