const service = require('./index')

module.exports = service
  ('service')
  ({
    id: false,
    type: true,
    description: false,
    value: false,
    id_user_provider: false,
    id_user_client: true,
    user_client_place: true,
    service_place: false,
    date: true,
    hour: true,
    status: true
  })
  ((data) => ({
    type: data.type,
    description: data.description,
    value: data.value,
    id_user_provider: data.id_user_provider,
    id_user_client: data.id_user_client,
    user_client_place: data.user_client_place,
    service_place: data.service_place,
    date: data.date,
    hour: data.hour,
    status: data.status
  }))
