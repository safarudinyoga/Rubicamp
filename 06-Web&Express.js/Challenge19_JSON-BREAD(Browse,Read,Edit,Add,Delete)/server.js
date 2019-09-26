const express = require("express");
const path = require("path");
const fs = require("fs")
const bodyParser = require("body-parser")
const app = express();
const datajson = fs.readFileSync("./data.json");
let data = JSON.parse(datajson);
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) //lempar body
 
// parse application/json
app.use(bodyParser.json()) //postman

// awal page
app.get('/', (req, res) => {
    res.render ('index', {data: data});
});

// get add page
app.get('/add', (req, res) => {
    res.render ('add');
});

// post add page
app.post('/add', (req, res) => {
    data.push({
        string: req.body.string, 
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean
    });
    fs.writeFileSync("./data.json", JSON.stringify(data));
    res.redirect('/');
});

// post edit page
app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const edited = {
        string: req.body.string, 
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean
    };
    data.splice(id, 1, edited);
    fs.writeFileSync("./data.json", JSON.stringify(data));
    res.redirect('/');
});

app.get('/edit/:id', (req,res) => {
    const id = req.params.id;
    res.render('edit', { item: {...data[id]}, id }); // '...' ambil objek (data)
})

// delete item
app.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    data.splice(id, 1);
    fs.writeFileSync("./data.json", JSON.stringify(data));
    res.redirect('/');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))





