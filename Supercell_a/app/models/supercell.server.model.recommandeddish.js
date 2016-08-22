const mongoose=require('mongoose')
var RecommendedDishesSchema=new mongoose.Schema({
	merchantId:String,
	dishesId:String,
	dishesName:String,
	merchantName:String,
	recommended:{type:Number,default:0}
})
mongoose.model('RecommendedDishes',RecommendedDishesSchema)
