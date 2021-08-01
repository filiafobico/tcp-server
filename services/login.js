module.exports = (user) => (data) => {
  const { email, password } = data

  if (!email) {
    throw new Error('Email is required')
  }
  if (!password) {
    throw new Error('Password is required')
  }

  const { users } = user.list({
    email,
    password
  })

  if (!users.length) {
    throw new Error('User not found')
  }

  return {
    id: users[0].id,
    desc: 'success login'
  }
}
