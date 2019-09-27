var express = require('express');
var router = express.Router();
let moment = require('moment');
const bodyParser = require('body-parser');
moment().format();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())


module.exports = (pool) => {

  /* GET home page. */
  router.get('/', (req, res, next) => {
    const params = [];
    let isFilter = false;
  
    if (req.query.checkid && req.query.id) {
      params.push(`id=${req.query.id}`);
      isFilter = true;
    }
    if (req.query.checkstring && req.query.string) {
      params.push(`string like '%${req.query.string}%'`);
      isFilter = true;
    }
    if (req.query.checkinteger && req.query.integer) {
      params.push(`integer=${req.query.integer}`);
      isFilter = true;
    }
    if (req.query.checkfloat && req.query.float) {
      params.push(`float=${req.query.float}`);
      isFilter = true;
    }
    if (req.query.checkdate && req.query.startdate && req.query.enddate) {
      params.push(`date BETWEEN '${req.query.startdate}' AND '${req.query.enddate}'`);
      isFilter = true;
    }
    if (req.query.checkboolean && req.query.boolean) {
      params.push(`boolean='${req.query.boolean}'`);
      isFilter = true;
    }
  
    // COUNT DATA
    var sql = `SELECT COUNT(*) AS total FROM data`;
    if (isFilter) {
      sql += ` WHERE ${params.join(' AND ')}`
    }
    //console.log(sql);
    
    pool.query(sql,(err, count) => {
      const rows = count.rows[0].total;   // JUMLAH DATA YG DITAMPILKAN DALAM PAGE
      const page = req.query.page || 1; // HALAMAN PERTAMA
      const limit = 5; // LIMIT DATA DITAMPILKAN
      const offset = (page - 1) * limit; // OFFSET = 0
      const url = req.url === '/' ? '/?page=1' : req.url;   // URL
      const pages = Math.ceil(rows / limit); // MENCARI JUMLAH DATA
      sql = `SELECT * FROM data`;
      if (isFilter) {
        sql += ` WHERE ${params.join(' AND ')}`
      }
      sql += ` LIMIT ${limit} OFFSET ${offset}`;
      //console.log(sql);
  
      pool.query(sql, (err, row) => {
        if (err) throw err;
        res.render('list', {
          data: row.rows,
          page,
          moment,
          pages,
          query: req.query,
          url
        });
      })
    })
  });
  
  router.get ('/add', (req, res, next) => {
    res.render ('add');
  });
  
  router.post ('/add', (req, res, next) => {
    let sqladd = `INSERT INTO data (string, integer, float, date, boolean) VALUES($1,$2,$3,$4,$5)`;
    let insert = [req.body.string, req.body.integer, req.body.float, req.body.date, req.body.boolean]
    pool.query (sqladd, insert, (err) => {
      if (err) throw err;
      res.redirect('/');
    })
  })
  
  router.get ('/edit/:id', (req, res, next) => {
    let id = req.params.id;
    //let string = req.params.string;
    let sqlgetedit = `SELECT * FROM data WHERE id=$1`;
    pool.query(sqlgetedit, [id], (err, item) => {
      if (err) throw err;
      //console.log(item);
      //console.log(sqlgetedit);
      res.render ('edit', { item:item.rows[0], moment} );
    })
  })
  
  router.post ('/edit/:id', (req, res, next) => {
    let id = req.params.id;
    let sqlpostedit = `UPDATE data 
    SET string =$1, integer=$2, float =$3, date=$4, boolean=$5 WHERE id=$6`;
    let insert = [req.body.string, req.body.integer, req.body.float, req.body.date, req.body.boolean, id];
    pool.query (sqlpostedit, insert, (err) => {
      if (err) throw err;
      console.log(err);
      res.redirect('/');
    })
  })
  
  router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    let sqldelete = `DELETE FROM data WHERE id = $1`;
    pool.query(sqldelete, [id], (err) => {
      if (err) throw err;
      res.redirect('/')
    })
    console.log('data berhasil di delete');
  })
  return router;
}

