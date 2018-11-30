const { Schema, model } = require('mongoose')
const mongoosePlugin = require('mongoose-createdat-updatedat')


const specialtiesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Number,
    required: true
  },
  updatedBy: {
    type: Number,
    required: false
  }
})

//Sets a plugin for the schema to handle createdAt and updatedAt records
specialtiesSchema.plugin(mongoosePlugin)

const SpecialtiesModel = model('specialties', specialtiesSchema)
module.exports.SpecialtiesModel = SpecialtiesModel
module.exports.specialtiesSchema = specialtiesSchema