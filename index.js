import express from 'express';
const app = express();

app.get('/', function (req, res) {
    console.log('home')
});

app.listen(1994);