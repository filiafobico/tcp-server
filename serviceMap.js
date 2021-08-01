const user = require('./services/user')
const service = require('./services/service')
const login = require('./services/login')
const logout = require('./services/logout')

module.exports = {
  service,
  user,
  login: login(user),
  logout
}
