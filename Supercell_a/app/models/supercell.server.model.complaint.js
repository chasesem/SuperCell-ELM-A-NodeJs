const mongoose = require('mongoose')
var ComplaintSchema = new mongoose.Schema({
	orderId:String,
	customerId:String,
	phoneNumber:String,
	merchantId:String,
	merchantName:String,
	complainMessage:String,
	complainState:{type:Number,default:1}
})
mongoose.model('Complaint',ComplaintSchema)