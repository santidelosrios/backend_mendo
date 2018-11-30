const { Schema, model } = require('mongoose')
const mongoosePlugin = require('mongoose-createdat-updatedat')
const { specialtiesSchema } = require('./specialitiesModel.js')

const providersSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: false,
    default: ''
  },
  email: {
    type: String,
    required: true
  },
  specialty: {
    type: specialtiesSchema,
    required: true
  },
  projectedStartDate: {
    type: Date,
    required: true
  },
  employerId: {
    type: Number,
    required: true
  },
  providerType: {
    type: String,
    required: true
  },
  staffStatus: {
    type: String,
    required: true
  },
  assignedTo: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdBy: {
    type: Number,
    required: true
  },
  updatedBy: {
    type: Number,
    required: false,
    default: 0
  }
})

//Sets a plugin for the schema to handle createdAt and updatedAt records
providersSchema.plugin(mongoosePlugin)

const ProvidersModel = model('providers', providersSchema)
module.exports = ProvidersModel
