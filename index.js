import fileSystem, { appendFileSync } from 'node:fs';
import express from 'express';
import pokesData from './data/pokemon-data.json' assert {type: 'json'}

fileSystem.readdir('./css', function (err, files) {
    if (err) {
        console.error(err);
        return;
    }

    const cssFiles = files.filter(file => file.endsWith('.css'));
    let totalContent = '';
    const destination = 'compiled.css';

    cssFiles.forEach(function (file) {

        var fileContents = fileSystem.readFileSync(`./css/${file}`, 'utf8');
        if (file == 'compiled.css') {
            var fileContents = ''
        }

        totalContent += fileContents;
    })

    fileSystem.writeFileSync(`./css/${destination}`, totalContent, function (err) {
        if (err) {
            console.error(err);
            return;
        }
    })
    console.log("Done :)")
})


const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('css'));


app.get('/', (req, res) => {
    res.render('pages/home');
});

app.get('/pokes', (req, res) => {
    res.render('pages/pokes', { pokemons: pokesData });
});

app.get('/pokes/:id', (req, res) => {
    let pokemon = '';
    pokesData.forEach(poke => {
        if (poke.id == req.params.id) {
            pokemon = poke;
        }
    });
    res.render('pages/poke', { pokemon });
});


app.use(function (req, res) {
    res.status(404).render('pages/404', { query: req.url })
})

app.listen(1994);