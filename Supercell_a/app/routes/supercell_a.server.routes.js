var merchantController = require('../controllers/supercell.server.MerchantStateController')
var complaintController = require('../controllers/supercell.server.complaintController')
var recommandDishesController = require('../controllers/supercell.server.RecommandDishesController')
module.exports = (app)=>{
	app.param('id',(req,res,next,id)=>{
		//console.log(id)
		req.id = id;
		next()
	})

	app.get('/SuperCell-ELM-A/merchantmanage/getAllcomplaint.do',complaintController.getAllComplaint)
	app.get('/SuperCell-ELM-A/merchantmanage/getSimpleMerchantState.do/:id',merchantController.getSimpleMerchantState)
	app.get('/SuperCell-ELM-A/merchantmanage/getinfo.do',merchantController.getMerchantDetail)
	app.get('/SuperCell-ELM-A/merchantmanage/changestates.do',merchantController.changeMerchantStates)
	app.get('/SuperCell-ELM-A/merchantmanage/getcomplain.do',complaintController.getComplaint)
	app.get('/SuperCell-ELM-A/merchantmanage/getLowRating.do',merchantController.getLowRating)
	app.get('/SuperCell-ELM-A/merchantmanage/getmerchantstate.do',merchantController.getAllMerchant)
	app.get('/SuperCell-ELM-A/merchantmanage/getOrderItem.do/:id',complaintController.getOrderDetails)
	app.get('/SuperCell-ELM-A/merchantmanage/getNormalMerchant.do',merchantController.getNormalMerchant)
	app.get('/SuperCell-ELM-A/merchantmanage/getComplaintState.do/:id',complaintController.getComplaintState)
	app.get('/SuperCell-ELM-A/merchantmanage/changeComplaintState.do',complaintController.changeComplaintState)

	app.get('/SuperCell-ELM-A/recommandedDishes/getdishes.do',recommandDishesController.getRecommendedDishes)
	app.get('/SuperCell-ELM-A/recommandedDishes/getlist.do',recommandDishesController.getList)
	app.get('/SuperCell-ELM-A/recommandedDishes/changestate.do',recommandDishesController.changeState)
	app.get('/SuperCell-ELM-A/recommandedDishes/getRecommendDishlist.do',recommandDishesController.getRecommendDishlist)
	//app.post(/'')
	// app.get('/bookstore/book',BookController.get)
	// app.delete('/bookstore/book',BookController.remove)
}