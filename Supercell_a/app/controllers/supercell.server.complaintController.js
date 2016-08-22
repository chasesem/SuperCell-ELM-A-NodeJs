const mongoose = require('mongoose')
const request = require('request')
var Complaint = mongoose.model('Complaint')
var MerchantState = mongoose.model('MerchantState')
module.exports={
	getAllComplaint:(req,res,next)=>{
			Complaint.find({},(err,doc)=>{
			if(err){
				console.log('search fail')
				return;
			}
			console.log(doc)
			res.json(doc)
		})
	},
	getComplaint:(req,res,next)=>{
		Complaint.findOne({orderId:req.id},(err,doc)=>{
			if(err){
				res.end("fail");
			}else{
				res.json(doc)
			}
		})
	},

	getOrderDetails:(req,res,next)=>{
		res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
		var url = "http://10.222.232.24:8080/SuperCell-ELM-C/customerOrder/complainOrderDetails.do/"+req.id;
		// var url = "http://localhost:3948/SuperCell-ELM-A/recommandedDishes/getlist.do"
		request(url, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    console.log(body) // Show the HTML for the Google homepage. 
		    res.end(body)
		  }
		})
	},

	changeComplaintState:(req,res,next)=>{
		var orderId = req.query.orderId;
		var state = req.query.state;
		if(state == 4){ 
			var merchantId = req.query.merchantId;
				MerchantState.update({merchantId:req.query.merchantId},{$set:{merchantState:4}},(err)=>{
					if(err){
						//res.json({result:"false"})
					}else{
						//res.json({result:"true"})
					}
				})
			}
		Complaint.update({orderId:orderId},{$set:{complainState:state}},(err)=>{
			if(err){
					res.json({result:"false"})
				}else{
					//res.json({result:"true"})
					res.redirect('../../html/complaint.html')
				}
		})
		
	},

	getComplaintState:(req,res,next)=>{
		Complaint.findOne({orderId:req.id},(err,doc)=>{
			if(err){
				res.end("fail");
			}else{
				//res.json({orderId:req.id,ComplaintState:doc.complainState})
				res.json(doc)
			}
		})
	}


}
