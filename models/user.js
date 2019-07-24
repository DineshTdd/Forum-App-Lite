const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // external package npm install --save mongoose-unique-validator
mongoose.set('useCreateIndex', true);


const userSchema = mongoose.Schema({
    email: { type:String, required: true, unique:true }, // unique here is not an validator nstead do some internal optimisations making sure that user with same id is not entered twice
    password: { type:String, required: true }
});

userSchema.plugin(uniqueValidator); // unique fields value validator

module.exports = mongoose.model('User',userSchema);