require('dotenv').config();

const knex = require('knex');
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});
function searchByName(searchTerm) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then((result) => console.log(result));
}

function paginateGroceries(page) {
  const groceriesPerPage = 6;
  const offset = groceriesPerPage * (page - 1);
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(groceriesPerPage)
    .offset(offset)
    .then((result) => console.log(result));
}

// function getItemsAfterDay(daysAgo) {
//   knexInstance
//     .select('*')
//     .where(
//       'date_added',
//       '>',
//       knexInstance.raw(now() - '?? days'::INTERVAL, daysAgo)
//     ); // > means more recent .from('shopping_list') .then(result => { console.log(result) })
// }

function totalCost() {
  knexInstance
    .select('category')
    .from('shopping_list')
    .sum('price')
    .groupBy('category')
    .then((result) => console.log(result));
}

// searchByName('apple');
// paginateGroceries(2);
// getItemsAfterDay(2);
totalCost();
