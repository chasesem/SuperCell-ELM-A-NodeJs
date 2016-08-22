const mongoose = require('mongoose')
var MerchantStateSchema = new mongoose.Schema({
	merchantId:String,
	merchantState:Number,
	rating:{type:Number,default:10}
})
mongoose.model('MerchantState',MerchantStateSchema)