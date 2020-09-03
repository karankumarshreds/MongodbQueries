const mongoose = require('mongoose')
const User = require('../models/user')
const create = require('./create.test')
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log("DB Connected")
    }
    catch (err) {
        console.log(err);
    }
}
connectDB()


const main = async () => {
    await create()

    // deletes all the users 
    // await User.deleteMany({ name: "Joe" })

    // similar to find first and then remove
    // await User.findByIdAndDelete("5f507d2635506227c0be4316")

    // this updates all the queries 
    // await User.updateMany({ name: "Karan" })

    // this updates the first entry 
    // await User.updateOne({ name: "Jonny" })
}
main()
