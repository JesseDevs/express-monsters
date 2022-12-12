import express from 'express';
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('pages/home');
});

app.get('/list', (req, res) => {
    res.render('pages/list');
});

app.get('/detail', (req, res) => {
    res.render('pages/detail');
});

app.use(function (req, res) {
    res.status(404).render('pages/404', { query: req.url })
})


app.listen(1994);