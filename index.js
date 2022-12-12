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
        const fileContents = fileSystem.readFileSync(`./css/${file}`, 'utf8');

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

app.locals.pokemons = pokesData;

app.get('/', (req, res) => {
    res.render('pages/home');
});

app.get('/list', (req, res) => {
    res.render('pages/list', { pokemons: pokesData });
});

app.get('/detail', (req, res) => {
    res.render('pages/detail');
});

app.use(function (req, res) {
    res.status(404).render('pages/404', { query: req.url })
})

app.listen(1994);