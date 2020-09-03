const User = require('../models/user')

const create = async () => {
    const user = new User({ name: "Master", postCount: 99 })
    await user.save()
}

module.exports = create

