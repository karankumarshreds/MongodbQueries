const mongoose = require('mongoose')
require('dotenv').config()

const create = require('./create.test')
const get = require('./get.test')

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:30039/auth", {
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
    // await create()
    await get()

    // deletes all the users 
    // await User.deleteMany({ name: "Joe" })

    // similar to find first and then remove
    // await User.findByIdAndDelete("5f507d2635506227c0be4316")

    // this updates all the queries 
    // await User.updateMany({ name: "Karan" })

    // this updates the first entry 
    // await User.updateOne({ name: "Jonny" })

    // this increments the post count by 1 for all the users with name Joe 
    // await User.updateMany({ name: "Joe" }, { $inc: { postCount: 1 } })
}
main()
