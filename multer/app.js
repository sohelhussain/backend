const express = require('express');
const upload = require('./multer-config');
// const upload = require('./multer-config')
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
})
app.post('/upload', upload.single('filename'), (req, res) => {
    res.redirect('/');
})



app.listen(3000);