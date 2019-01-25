const mongoose = require('mongoose');
const connectionString = "mongodb://localhost/users"

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', ()=> {
    console.log('mongoose connected to ', connectionString);
})

mongoose.connection.on('err', ()=> {
    console.log('mongoose error ', connectionString);
})

mongoose.connection.on('disconnected', ()=> {
    console.log('mongoose disconnected from ', connectionString);
});