const db = require('./lib/database');
const http = require('./lib/http');


const { addRouter } = require('./lib/router');

addRouter('get', '/list', async (res, get, post, files) => {
  try {
    let data = await db.query('SELECT * FROM item_table');
    res.writeJson({error: 0, msg: data})
  } catch (e) {
    res.writeJson({error: 1, msg: 'database error'})
  }
  res.end()
});


addRouter('post', '/add', async (res, get, post, files) => {
  let {title, price, num} = post;
  if(!title || !price || !num) {
    res.writeJson({error: 1, msg: 'params invalid'});
    res.end();
  } else {
    price = Number(price);
    num = Number(num);
    if(isNaN(price) || isNaN(num)) {
      res.writeJson({error: 1, msg: 'params invalid'});
    } else {
      try {
        await db.query('INSERT INTO item_table (title, price, num) value(?, ?, ?)', [title, price, num]);
        res.writeJson({error: 1, msg: 'success'});
      } catch(e) {
        res.writeJson({error: 1, msg: 'database error'});
      }
    }

    res.end();
  }

  res.end();
});

addRouter('delete', '/delete', async (res, get, post, files) => {

  try {
    await db.query('DELETE FROM item_table WHERE num = 33')
    res.writeJson({error:0, msg: 'delete success'})
  } catch(e) {
    res.writeJson({error:1, msg: 'delete error'})
  }

  res.end();
});


