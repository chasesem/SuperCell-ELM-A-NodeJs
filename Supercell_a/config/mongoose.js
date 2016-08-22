const mongoose = require('mongoose')
const config = require('./config')
const express = require('./express')
// const stomp = 
module.exports = ()=>{
mongoose.connect(config.mongodb,()=>{
	console.log('db connected....')
    require('../app/models/supercell.server.model.merchantState.js')
    require('../app/models/supercell.server.model.complaint.js')
    require('../app/models/supercell.server.model.recommandeddish.js')
  	const stomp = require('./stompclient')
  	var stomp_client = stomp()
    var app = express()
    app.listen(config.PORT,()=>{
    	console.log('server start')
	})
})

}








