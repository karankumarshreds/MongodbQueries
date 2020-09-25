const User = require('../models/user')

const get = async () => {
  const user = await User.find({
    name: "Test user"
  })
  if (!user) return console.log('User not found')
  console.log('User found', user.length)
}

module.exports = get

