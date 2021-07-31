module.exports = (data) => {
  try {
    const message = JSON.parse(data.toString())
    console.log('received: ', message)
    return message
  } catch (error) {
    throw new Error('error on parsing message. ' + error.message)
  }
}
