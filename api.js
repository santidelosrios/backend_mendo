

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const providersRouter = require('./routes/providers.js')

/**
 * @description App class for Express server configuration,
 * Loads the Express web server and all its endpoints and sets up the required configurations
 * @author Juan Camilo Mendoza
 * 
 */
class App {

  constructor() {
    this.webServer = express()
    this.config()
    this.middlewares()
    this.routes()
  }
  /**
   *
   * @description Sets up the required middlewares to proper Express server configuration
   * @memberof App
   */
  middlewares() {
    //use body-pser library to handle POST request
    this.webServer.use(bodyParser.json())
    this.webServer.use(bodyParser.urlencoded({extended: false}))
  }
  config() {
    //Applies basic API configuration to all responses handled by Express server
    this.webServer.all("/*", (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*")
      res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With")
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
      return next()
    })

      //Mongodb initialization
      mongoose.connect('mongodb://jcamilo:jcamilo123@ds135534.mlab.com:35534/evercheck-test-3', {useNewUrlParser: true})
  
      mongoose.connection.on('error', (error) => {
          console.log(`error`, error)
      })
  }
  routes() {
    this.webServer.use('/api', providersRouter)
  }
}

module.exports = new App().webServer