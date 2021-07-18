var express = require('express');
var router = express.Router();
const productController = require('../controllers/product.controllers')
/* GET users listing. */
// route.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct)

router.route('/:id')
  .get(productController.getProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct)

module.exports = router;
