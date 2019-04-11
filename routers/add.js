const db = require('../lib/database')

module.exports = async (res, get, post, files) => {
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
      console.log(title, price, num);
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
}
