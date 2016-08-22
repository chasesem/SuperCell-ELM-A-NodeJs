const mongoose = require('mongoose')
const request = require('request')
var MerchantState = mongoose.model('MerchantState')

module.exports={
	getMerchantDetail:(req,res,next)=>{
		var merchantId = req.query.merchantId;
		var url = "http://10.222.232.34:8080/SuperCell-ELM-M/merchant/getMerchantInfo.do/"+merchantId;
		request(url, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
		    // console.log(body) // Show the HTML for the Google homepage. 
		    res.end(body)
		  }
		})
	},

	changeMerchantStates:(req,res,next)=>{
		var merchantId = req.query.merchantId;
		var merchantState = req.query.merchantState;
			MerchantState.update({merchantId:req.query.merchantId},{$set:{merchantState:req.query.merchantState}},(err)=>{
				if(err){
					res.json({result:"false"})
				}else{
					//res.json({result:"true"})
					res.redirect('../../html/merchantstate.html')
				}
			})
	},

	getLowRating:(req,res,next)=>{
		MerchantState.find({rating:{'$lt':5}},(error,doc)=>{
			if(error){
				console.log(error)
			}else{
				res.json(doc)
			}

		})

		
	},

	getSimpleMerchantState:(req,res,next)=>{
		// var merchantId = req.query.merchantId;
		// var merchantState = MerchantState.find;
		MerchantState.findOne({merchantId:req.id},(err,doc)=>{
			if(err){
				res.end("fail");
			}else{
				res.json({
					merchantId:parseInt(doc.merchantId),
					merchantState:doc.merchantState,
					merchantStateText:"123"
				})
			}
		})

	},
	getNormalMerchant:(req,res,next)=>{
		MerchantState.find({merchantState:1},(err,doc)=>{
			if(err){
				res.json(err)
			}else{
				res.json(doc)
			}
		})
	},
	getAllMerchant:(req,res,next)=>{
		var url = "http://10.222.232.34:8080/SuperCell-ELM-M/merchant/getAllMerchant.do"
		var merchantArray = []
		var merchantStateArray = []
		request(url, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		  //  console.log(body) // Show the HTML for the Google homepage. 
		    // res.end(body)
		    var result = JSON.parse(body)
		    for(var i = 0 ; i < result.length;i++){
		    	//console.log(result[i].id)
		    	//console.log(1)
		    	merchantArray.push({
		    		merchantId:result[i].id,
		    		merchantName:result[i].shopName
		    	})
		    }
		  }
		  	MerchantState.find({},(err,doc)=>{
			if(err){
				//res.json(err)
			}else{
				//console.log(merchantArray.length)
				//res.json(doc)
				for(var i = 0 ; i < doc.length ; i++){
					for(var j = 0 ; j <merchantArray.length;j++){
						//console.log(doc[1].merchantId)
						//console.log(merchantArray[1].merchantId)
						if(doc[i].merchantId==merchantArray[j].merchantId+""){
							merchantStateArray.push({
								merchantId:doc[i].merchantId,
								merchantState:doc[i].merchantState,
								merchantName:merchantArray[j].merchantName
							})
						}
					}
				}
				res.json(merchantStateArray)
			}
		})
		})

	}
	
}	