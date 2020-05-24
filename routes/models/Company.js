const { Schema, model } = require('mongoose')

const schema = new Schema({
  companyName: { type: String, required: true },
  web: { type: String, required: true },
  phone: { type: String, required: true },
  workingHours: { type: String, required: true },
  serviceSlotTimeLength: { type: Bytes, required: true}

})

module.exports = model('Company', schema)
