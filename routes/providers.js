/**
 * @description Creates a new Express router for the providers collection
 * @author Juan Camilo Mendoza
 * 
 */

const { Router } = require('express')
const ProvidersModel = require('../models/providersModel.js')
const { SpecialtiesModel } = require('../models/specialitiesModel')
const { Types } = require('mongoose')

//Initializes the Router for the providers model
const providersRouter = Router()

/**
 * @description GET /api/providers 
 * Returns all records from the providers collection
 * @returns Array 
 */
providersRouter.get('/providers', async (req, res) => {
  try {
    const providersRecords = await ProvidersModel.find({})

    res.status(200).json({Providers: providersRecords})

  } catch(error) {
    console.log('------------------------------------')
    console.log(error)
    console.log('------------------------------------')

    res.status(500).json({err: String(error)})
  }
})
/**
 * @description GET /api/providers/:providerId
 * Returns an specific provider from the providers collection, given a providerId
 * @param {providerId} - string
 * @returns provider 
 */
providersRouter.get('/providers/:providerId', async (req, res) => {
  try {
    const providerId = req.params.providerId

    if(!providerId) {
      return res.status(400).json({err: 'BAD REQUEST: Missing arguments'})
    }

    const _id = Types.ObjectId(providerId)
    const provider = await ProvidersModel.findOne({_id})

    if(!provider) {
      return res.status(400).json({err: 'BAD REQUEST: Provider with the given providerId does not exist'})
    }

    res.status(200).json({provider})

  } catch(error) {
    console.log('------------------------------------')
    console.log(error)
    console.log('------------------------------------')

    res.status(500).json({err: String(error)})
  }
})
/**
 * @description POST /api/providers 
 * Creates a new provider and saves it in the providers collection
 * @returns bool - sucess: true/false 
 */
providersRouter.post('/providers', async (req, res) => {
  try {
    const { firstName, lastName, middleName, email, specialtyId, projectedStartDate, employerId, providerType, staffStatus, assignedTo, status, createdBy } = req.body

    if(!firstName || !lastName || !email || !specialtyId || !projectedStartDate || !employerId || !providerType || !staffStatus || !assignedTo || !status || !createdBy) {
      return res.status(400).json({err: 'BAD REQUEST: Missing arguments'})
    }

    const _id = Types.ObjectId(specialtyId)
    const specialty = await SpecialtiesModel.findOne({_id})
    const _projectedStartDate = Date(projectedStartDate)

    const newProvider = new ProvidersModel({
      firstName,
      lastName,
      middleName: middleName || '',
      email,
      specialty,
      projectedStartDate: _projectedStartDate,
      employerId: parseInt(employerId),
      providerType,
      staffStatus,
      assignedTo: parseInt(assignedTo),
      status,
      createdBy: parseInt(createdBy)
    })

    await newProvider.save()

    res.status(200).json({success: true})

  } catch(error) {
    console.log('------------------------------------')
    console.log(error)
    console.log('------------------------------------')

    res.status(500).json({err: String(error)})
  }
})
/**
 * @description PUT /api/providers 
 * Udates a provider and saves it in the providers collection, given a providerId
 * @param {providerId} - string
 * @returns bool - sucess: true/false 
 */
providersRouter.put('/providers/:providerId', async (req, res) => {
  try {
    const providerId = req.params.providerId
    const { firstName, lastName, middleName, email, specialtyId, projectedStartDate, employerId, providerType, staffStatus, assignedTo, status, updatedBy } = req.body

    if(!providerId || !updatedBy) {
      return res.status(400).json({err: 'BAD REQUEST: Missing arguments'})
    }

    let specialty = {}

    if(specialtyId) {
      const _id = Types.ObjectId(specialtyId)
      specialty = await SpecialtiesModel.findOne({_id})
    }

    const _providerId = Types.ObjectId(providerId)
    const provider = await ProvidersModel.findOne({_id: _providerId})

    if(!provider) {
      return res.status(400).json({err: 'BAD REQUEST: Provider with the given providerId does not exist'})
    }

    const _firstName = firstName || provider.firstName
    const _lastName = lastName || provider.lastName
    const _middleName = middleName || provider.middleName
    const _email = email || provider.email
    const _specialty = Object.keys(specialty).length > 0 || provider.specialty
    const _projectedStartDate = projectedStartDate ? new Date(projectedStartDate) : provider.projectedStartDate
    const _employerId = employerId ? parseInt(employerId) : provider.employerId
    const _providerType = providerType || provider.providerType
    const _staffStatus = staffStatus || provider.staffStatus
    const _assignedTo = assignedTo ? parseInt(assignedTo) : provider.assignedTo
    const _status = status || provider.status
    
    await provider.update({firstName: _firstName, lastName: _lastName, middleName: _middleName, email: _email, specialty: _specialty, projectedStartDate: _projectedStartDate, employerId: _employerId, providerType: _providerType, staffStatus: _staffStatus, assignedTo: _assignedTo, status: _status, updatedBy: parseInt(updatedBy)})

    res.status(200).json({success: true})
  } catch(error) {
    console.log('------------------------------------')
    console.log(error)
    console.log('------------------------------------')

    res.status(500).json({err: String(error)})
  }
})
/**
 * @description DELETE /api/providers 
 * Deletes a provider in the providers collection, given a providerId
 * @param {providerId} - string
 * @returns bool - sucess: true/false 
 */
providersRouter.delete('/providers/:providerId', async (req, res) => {
  try {
    const providerId = req.params.providerId

    if(!providerId) {
      return res.status(400).json({err: 'BAD REQUEST: Missing arguments'})
    }

    const _id = Types.ObjectId(providerId)
    const provider = await ProvidersModel.findOne({_id})

    if(!provider) {
      return res.status(400).json({err: 'BAD REQUEST: Provider with the given providerId does not exist'})
    }

    await provider.delete()

    res.status(200).json({success: true})

  } catch(error) {
    console.log('------------------------------------')
    console.log(error)
    console.log('------------------------------------')

    res.status(500).json({err: String(error)})
  }
})

module.exports = providersRouter