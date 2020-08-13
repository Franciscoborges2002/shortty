const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://francisco:2B5ckcuLLSFkd9sl@shortty.uqj2q.mongodb.net/shortty?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
).then(()=>{
    console.log('Sucessfully connected to the DB')
}).catch((err) =>{
    console.log('Error while connecting to DB: ' + err);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;

//2B5ckcuLLSFkd9sl || nick: francisco
//mongodb+srv://francisco:<password>@shortty.uqj2q.mongodb.net/<dbname>?retryWrites=true&w=majority