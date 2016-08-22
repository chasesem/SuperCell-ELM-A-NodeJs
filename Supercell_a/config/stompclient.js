const Stomp = require('stomp-client');
const mongoose = require('mongoose');
const destination1 = '/queue/merchant-state';
const destination2 = '/queue/customer-complaint';
const destination3 = '/queue/recommend-dish';
const destination4 = '/queue/ratingQueue'
var MerchantState = mongoose.model('MerchantState')
var Complaint = mongoose.model('Complaint')
var RecommendedDishes = mongoose.model('RecommendedDishes')
var client1 = new Stomp('localhost',61613,'','');
var client2 = new Stomp('localhost',61613,'','');
var client3 = new Stomp('localhost',61613,'','');
var client4 = new Stomp('localhost',61613,'','');
 module.exports= ()=>{
 	
 	console.log('client')
	client1.connect((sessionId)=>{
		client1.subscribe(destination1,(body,headers)=>{
			console.log('from queue1',body)

			var result = JSON.parse(body)
			var merchantState = new MerchantState({
				merchantId:result[0].merchantId,
				merchantState:result[0].merchantState
			})
			merchantState.save((err)=>{
				if(err){
					console.log(err)
				}
				else{
					console.log('succ')
				}
			})
		})
	})
	client2.connect((sessionId)=>{
		client2.subscribe(destination2,(body,headers)=>{
			console.log('from queue2',body)
			var result = JSON.parse(body)
			console.log(result.orderId)
			var complaint = new Complaint({
				orderId:result[0].orderId,
				customerId:result[0].customerId,
				phoneNumber:result[0].phoneNumber,
				merchantId:result[0].merchantId,
				merchantName:result[0].merchantName,
				complainMessage:result[0].complainMessage
			})
			complaint.save((err)=>{
				if(err){
					console.log(err)
				}
				else{
					console.log('succ')
				}
			})
		})
	})
	client3.connect((sessionId)=>{
		client3.subscribe(destination3,(body,headers)=>{
			console.log(body)
			var result = JSON.parse(body)
			var recommendedDishes = new RecommendedDishes({
				merchantId:result[0].merchantId,
				dishesId:result[0].dishesId,
				dishesName:result[0].dishName,
				merchantName:result[0].merchantName
			})
			RecommendedDishes.findOne({merchantId:result[0].merchantId},(err,doc)=>{
				if(err){
					console.log(err)
				}else{
					if(doc!=null){
						RecommendedDishes.update({merchantId:result[0].merchantId},{$set:{dishesId:result[0].dishesId,dishesName:result[0].dishName,recommended:0}},(err)=>{
							if(err){
								console.log(err)
							}else{
								console.log(11)
							}
						})
					}else{
						recommendedDishes.save((err)=>{
							if(err){
								console.log(err)
							}else{
								console.log("succ")
							}
						})
					}
				}
			})
		})
	})
	client4.connect((sessionId)=>{
		client4.subscribe(destination4,(body,headers)=>{
			console.log('from queue4',body)
			var result = JSON.parse(body)
			MerchantState.update({merchantId:result[0].merchantId},{$set:{rating:result[0].rating}},(err)=>{
				if(err){
					console.log('update fail')
				}else{
					console.log('update succ')
				}
			})
		})
	})
 }