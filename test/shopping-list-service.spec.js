const ShoppingListServer = require('../src/shopping-list-service.js');
const knex = require('knex');

describe(`Shopping List service object`, function () {
  let db;
  let testItems = [
    {
      id: 1,
      name: 'test1',
      price: '1',
      checked: false,
      category: 'test1-category',
    },
    {
      id: 2,
      name: 'test2',
      price: '2',
      checked: true,
      category: 'test2-category',
    },
    {
      id: 3,
      name: 'test3',
      price: '3',
      checked: false,
      category: 'test3-category',
    },
    {
      id: 4,
      name: 'test4',
      price: '4',
      checked: true,
      category: 'test4-category',
    },
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  before(() => db('shopping_list').truncate());

  before(() => {
    return db.into('shopping_list').insert(testItems);
  });

  describe(`getAllItems()`, () => {
    it(`resolves all articles from 'shopping_list table'`, () => {
      //   const expectedItems = testItems.map((item) => ({
      //     ...item,
      //     checked: false,
      //   }));
      return ShoppingListServer.getAllItems(db).then((actual) =>
        expect(actual).to.eql(testItems)
      );
    });
  });
  after(() => db.destroy());
});
