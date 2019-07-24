const mongoose = require('mongoose');
const dbUrl= 'mongodb+srv://td:' + process.env.MONGO_ATLAS_PW + '@cluster0-imerj.mongodb.net/node-angular?retryWrites=true&w=majority';
const DB = mongoose.connect(dbUrl, { useNewUrlParser: true } )
    .then(() => {
        console.log('Connection was established with MOngoAtlasDB!');
    })
    .catch((err) => {
        console.log(err,'Failed Connection');
    });

module.exports = DB;