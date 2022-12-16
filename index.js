import fileSystem from 'node:fs';
import express from 'express';
import pokesData from './data/pokemon-data.json' assert {type: 'json'}


const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('css'));


app.listen(process.env.PORT || 1994, function () {
    console.log("Server starting... localhost:1994")
});

app.get('/', (req, res) => {
    res.render('pages/home');
});

app.get('/pokemons', (req, res) => {
    res.render('pages/pokemons', { pokemons: pokesData });
});

app.get('/pokemon/:id', (req, res) => {

    const pokemon = pokesData.find(function (pokemon) {
        return pokemon.id == req.params.id
    })
    res.render('pages/pokemon', { pokemon });
});


app.use(function (req, res) {
    res.status(404).render('pages/404', { query: req.url })
})

