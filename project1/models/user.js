const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    postCount: Number,
    // age: { type: Number, required: [true, 'Age must be provided'] }
})

const User = mongoose.model('user', userSchema)
module.exports = User   