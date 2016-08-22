const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
module.exports= ()=>{
	var app = express()
	app.use(express.static(path.join(__dirname,'../view')))


	app.use(bodyParser.urlencoded())
	app.use(bodyParser.json())

	require('../app/routes/supercell_a.server.routes')(app)

	//统一处理未知路由
	app.use((req,res,next)=>{
		res.status(404)
		res.end('Not found')
	})
	//统一处理错误
	app.use((err,req,res,next)=>{
		if(err){
			res.status(500)
			res.end(err)
		}

	})
	return app
}

