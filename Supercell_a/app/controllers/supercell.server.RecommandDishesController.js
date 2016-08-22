const mongoose = require('mongoose')
const request = require('request')
var RecommendedDishes = mongoose.model('RecommendedDishes')

module.exports={
	getRecommendedDishes:(req,res,next)=>{
		RecommendedDishes.findOne({merchantId:req.query.merchantId,recommended:1},(err,doc)=>{
			if(err){
				console.log('fail')
				res.end('fail')
			}else{
				//console.log(1111)
				if(doc==null){
					//console.log(doc.merchantId)
					//doc.dishesId =0
					res.json({dishesId:0})
				}else{
					res.json({
						merchantId:parseInt(doc.merchantId),
						dishesId:parseInt(doc.dishesId),
						dishName:doc.dishName,
						merchantName:doc.merchantName,
						recommended:Boolean(doc.recommended)
					})
				}
				// }else{
				// 	res.end('[]')
				// }

			}

		})
	},
	getList:(req,res,next)=>{
		RecommendedDishes.find({},(err,doc)=>{
			if(err){
				res.end('fail')
			}else{
				res.json(doc)
			}
		})
	},
	changeState:(req,res,next)=>{
		//console.log(req.query.state)
		RecommendedDishes.update({merchantId:req.query.id},{$set:{recommended:req.query.state}},(err)=>{
			if(err){
				res.json({result:"false"})
			}else{
				res.json({result:"true"})
			}
		})
	},
	getRecommendDishlist:(req,res,next)=>{
		RecommendedDishes.find({recommended:1},(err,doc)=>{
			if(err){
				res.json({result:"false"})
			}else{
				res.json(doc)
			}
		})
	}

}