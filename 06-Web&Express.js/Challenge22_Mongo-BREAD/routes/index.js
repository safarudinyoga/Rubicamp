var express = require('express');
var router = express.Router();
//const bodyParser = require("body-parser");
const moment = require('moment');
const ObjectId = require('mongodb').ObjectId;
moment().format();

module.exports = (db) => {
  const collection = db.collection('data')
  /* GET home page. */
  router.get('/', (req, res, next) => {
    const params = {};
    let isFilter = false;

    // tidak usah filter id
    if (req.query.checkstring && req.query.string) {
      params.string = req.query.string;
      //isFilter = true;
    }
    if (req.query.checkinteger && req.query.integer) {
      params.integer = parseInt(req.query.integer);
      //isFilter = true;
    }
    if (req.query.checkfloat && req.query.float) {
      params.float = parseFloat(req.query.float);
      //isFilter = true;
    }
    if (req.query.checkdate && req.query.startdate && req.query.enddate) {
      //params.push(`date BETWEEN '${req.query.startdate}' AND '${req.query.enddate}'`);
      params.date= {};
      params.date.$gte = new Date(`${req.query.startdate}`)
      if(req.query.enddate)
      params.date.$lte = new Date(`${req.query.enddate}`);
      //isFilter = true;
    }
    if (req.query.checkboolean && req.query.boolean) {
      //params.push(`boolean='${req.query.boolean}'`);
      params.boolean = req.query.boolean;
      //isFilter = true;
    }

    // COUNT DATA
    /*var sql = `SELECT COUNT(*) AS total FROM data`;
    if (isFilter) {
      sql += ` WHERE ${params.join(' AND ')}`
    }*/
    //console.log(sql);

    //const rows = count.rows[0].total;   // JUMLAH DATA YG DITAMPILKAN DALAM PAGE
    const page = req.query.page || 1; // HALAMAN PERTAMA
    const limit = 2; // LIMIT DATA DITAMPILKAN
    const offset = (page - 1) * limit; // OFFSET = 0
    const url = req.url === '/' ? '/?page=1' : req.url;   // URL
    //const pages = Math.ceil(rows / limit); // MENCARI JUMLAH DATA

    collection.find(params).limit(limit).skip(offset).toArray().then(row => {
      collection.find(params).count().then(count => {
        res.render('index', {
          data: row,
          moment,
          page,
          pages: Math.ceil(count / limit) ,
          query: req.query,
          url
        })
      })
    })
  })

  //=================ADD==================
  router.get('/add', (req, res, next) => {
    res.render('add');
  });

  router.post('/add', (req, res, next) => {
    collection.insertOne({
      string: req.body.string,
      integer: parseInt(req.body.integer),
      float: parseFloat(req.body.float),
      date: new Date(req.body.date),
      boolean: req.body.boolean
    })
    console.log(req.body);
    res.redirect('/');
  })

  // =================EDIT=================
  router.get('/edit/:id', (req, res, next) => {
    collection.findOne({
      _id: ObjectId(req.params.id)
    }, (err, data) => {
      if (err) throw err;
      console.log(data);
      res.render('edit', { item: data, moment })
    })
  });


  /*let id = req.params.id;
  //let string = req.params.string;
  let sqlgetedit = `SELECT * FROM data WHERE id=$1`;
  pool.query(sqlgetedit, [id], (err, item) => {
    if (err) throw err;
    //console.log(item);
    //console.log(sqlgetedit);
    res.render('edit', { item: item.rows[0], moment });
  })
  })*/

  router.post('/edit/:id', (req, res, next) => {
    collection.updateMany({ _id: req.params.id }, {
      $set: {
        string: req.body.string,
        integer: parseInt(req.body.integer),
        float: parseFloat(req.body.float),
        date: new Date(req.body.date),
        boolean: req.body.boolean
      }
    }, (err, row) => {
      if (err) throw err;
      res.redirect('/');
    })
  })

  /*let id = req.params.id;
  let sqlpostedit = `UPDATE data 
  SET string =$1, integer=$2, float =$3, date=$4, boolean=$5 WHERE id=$6`;
  let insert = [req.body.string, req.body.integer, req.body.float, req.body.date, req.body.boolean, id];
  pool.query(sqlpostedit, insert, (err) => {
    if (err) throw err;
    console.log(err);
    res.redirect('/');
  })*/


  router.get('/delete/:id', (req, res, next) => {
    collection.deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
      if (err) throw err;
      res.redirect('/');
    })
    console.log('data berhasil di delete');
    /*let id = req.params.id;
    let sqldelete = `DELETE FROM data WHERE id = $1`;
    pool.query(sqldelete, [id], (err) => {
      if (err) throw err;
      res.redirect('/')
    })
    console.log('data berhasil di delete'); */
  })
  return router;
}