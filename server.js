require('./db/db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const userController = require('./controller/userRouter');
const photoController = require('./controller/photoRouter');

// MIDDLEWARE
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/users',userController);
app.use('/photos',photoController);
app.use(express.static('public'));

app.get('/', (req, res)=> {
    res.render('home.ejs');
})

app.listen(3000, () => {
    console.log("The server is connected.");
});