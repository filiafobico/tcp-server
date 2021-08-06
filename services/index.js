const validateFieldsOnCreate = (mapRequiredFields) => (data) => (
  Object.entries(mapRequiredFields)
    .map(([key, isRequired]) => (
      (isRequired && !data?.[key]) ? `property ${key} is required` : false
    ))
    .filter(Boolean)
    .join('; ')
)

const mountWhereClause = (mapRequiredFields) => (data) => (
  Object.keys(mapRequiredFields)
    .filter((key) => data?.[key])
    .map((key) => ({ [key]: data?.[key] }))
);

const getPositionById = (list) => (id) => {
  if (!id) {
    throw new Error('id field is required')
  }

  const position = list.findIndex((u) => `${u.id}` === `${id}`)

  if (position < 0) {
    throw new Error('id not found')
  }

  return position
}

module.exports = (entityName) => {
  let entities = []

  return (mapRequiredFields) => (mapFieldsOnCreate) => ({
    create: (data) => {
      const errors = validateFieldsOnCreate(mapRequiredFields)(data)
      if (errors) {
        throw new Error(errors)
      }

      const id = `${entities.length + 1}`

      entities.push({
        id,
        ...mapFieldsOnCreate(data),
      })

      return {
        id,
        desc: `success on create ${entityName}`
      }
    },
    list: (data) => {
      const where = mountWhereClause(mapRequiredFields)(data)

      if (!where.length) {
        return { [entityName + 's']: entities }
      }

      return {
        [entityName + 's']: where
          .reduce((acc, w) => (
            [[key, value]] = Object.entries(w),
            acc.filter((entity) => entity?.[key] === value)
          ), entities)
      }
    },
    update: (data) => {
      const position = getPositionById(entities)(data?.id)
      const where = mountWhereClause(mapRequiredFields)(data)

      entities.splice(position, 1, {
        ...entities[position],
        ...where
          .reduce((acc, f) => (
            [[key, value]] = Object.entries(f),
            { ...acc, [key]: `${value}`}
          ), {})
      })

      return {
        desc: `success on update ${entityName} ${data?.id}`
      }
    },
    remove: (data) => {
      const position = getPositionById(entities)(data?.id)

      entities.splice(position, 1)

      return {
        desc: `${entityName} ${data?.id} deleted with success`
      }
    }
  })
}
