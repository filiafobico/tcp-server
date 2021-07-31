const service = require('./index')

module.exports = service
  ('user')
  ({
    name: true,
    cpf: true,
    email: true,
    password: true,
    address: false,
    phone: false
  })
  ((data) => ({
    name: data.name,
    cpf: data.cpf,
    email: data.email,
    password: data.password,
    address: data.address,
    phone: data.phone
  }))
