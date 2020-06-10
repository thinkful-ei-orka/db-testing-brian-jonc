require('dotenv').config();
const knex = require('knex');
const ShoppingListService = require('./shopping-list-service');

const knexInstance = knex({
  client: 'pg',
  connect: process.env.DB_URL,
});

// use all the ArticlesService methods!!
ShoppingListService.getAllItems(knexInstance)
  .then((items) => console.log(items))
  .then(() =>
    ShoppingListService.insertItem(knexInstance, {
      name: 'newitem',
      price: '1.00',
      date_added: new Date(),
      checked: false,
      category: 'newitem-category',
    })
  )
  .then((newitem) => {
    console.log(newitem);
    return ShoppingListService.updateItem(knexInstance, newitem.id, {
      name: 'Updated name',
    }).then(() => ShoppingListService.getById(knexInstance, newitem.id));
  })
  .then((item) => {
    console.log(item);
    return ShoppingListService.deleteItem(knexInstance, item.id);
  });
