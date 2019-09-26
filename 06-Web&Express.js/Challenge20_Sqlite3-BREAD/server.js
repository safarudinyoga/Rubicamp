const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 2000;
const dbFile = __dirname + '/data.db';
let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        throw err;
    }
    console.log("koneksi success");
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) //lempar body

// parse application/json
app.use(bodyParser.json()) //postman

// Home & Filter
app.get('/', (req, res) => {
    let params = [];
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
    if (req.query.checkdate && req.query.startdate && req.query.enddate)  {
        params.push(`date BETWEEN '${req.query.startdate}' AND '${req.query.enddate}'`);
        isFilter = true;
    }
    if (req.query.checkboolean && req.query.boolean) {
        params.push(`boolean='${req.query.boolean}'`);
        isFilter = true;
    }

    // COUNT DATA
    let sql = `SELECT COUNT(*) AS total FROM challenge20`;
    if (isFilter) {
        sql += ` WHERE ${params.join(' AND ')}`
    }
    db.all(sql, (err, count) => {
        const page = req.query.page || 1; // HALAMAN PERTAMA
        const limit = 5; // LIMIT DATA DITAMPILKAN
        const offset = (page - 1) * limit; // OFFSET = 0
        const url = req.url == '/' ? '/?page=1' : req.url   // URL
        const total = count[0].total;   // JUMLAH DATA YG DITAMPILKAN DALAM PAGE
        const pages = Math.ceil(total / limit); // MENCARI JUMLAH DATA
        sql = `SELECT * FROM challenge20`;
        if (isFilter) {
            sql += ` WHERE ${params.join(' AND ')}`
        }
        sql += ` LIMIT ${limit} OFFSET ${offset}`;
        //console.log(sql);
        
        db.all(sql, (err, rows) => {
            res.render('index', {
                data: rows,
                page,
                pages,
                query: req.query,
                url
            });
        });
    });
});

// Get Form ADD
app.get('/add', (req, res) => {
    res.render('add', { title: 'Add Data' });
});

// Post Form ADD
app.post('/add', (req, res) => {
    const sqladd = `INSERT INTO challenge20 (string, integer, float, date, boolean) VALUES(?,?,?,?,?)`
    db.run(sqladd, [req.body.string, req.body.integer, req.body.float, req.body.date, req.body.boolean], (err) => {
        if (err) throw err;
        console.log('Susccess add inputan');
    })

    res.redirect('/');
});

// GET EDIT
app.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    let sqlgetedit = `SELECT * FROM challenge20 WHERE id=?`;
    db.get(sqlgetedit, id, (err, item) => {
        
        if (err) throw err;
        res.render('edit', { item })
    })
})
// POST EDIT
app.post('/edit/:id', (req, res) => {
    let id = req.params.id;
    let sqlpostedit = `UPDATE challenge20 
    SET string =?, integer=?, float =?, date=?, boolean=? WHERE id=?`
    db.run(sqlpostedit, [req.body.string, req.body.integer, req.body.float, req.body.date, req.body.boolean, id], (err) => {
        if (err) throw err;
    })
    res.redirect('/');
})
// DELETE
app.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    db.run('DELETE FROM challenge20 WHERE id = ?', id, (err) => {
        if (err) throw err;
    });
    res.redirect('/');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))