const productController = {}
const Product  = require("../models/Product")


productController.getAllProducts = async( req,res )=>{
    var product = await Product.find()
    res.json(product)
}

productController.getProduct = async( req,res )=>{
    Product.findById(req.params.id).then(product=>res.json(product))
    
}

productController.createProduct = async ( req,res ) => {
    const {nombre, descripcion, marca, precio, imagenUrl} = req.body.product
    var product = new Product({
        nombre,
        marca,
        precio,
        descripcion,
        imagenUrl,
    })

    product.save()
    .then(newProduct =>{
        res.json(newProduct)
    })
    .catch(err=>res.json(err))
},

productController.deleteProduct = async( req,res ) => {
    const {id} = req.params
    console.log(id)
    Product.findOneAndDelete({_id:id}).then(productDeleted=>
        res.json({productDeleted, msg:'product Delete'})
    )
    
},

productController.updateProduct = async (req,res) => {
    const {id} = req.params
    const {nombre, descripcion, marca, precio, imagenUrl} = req.body.data
    Product.findOneAndUpdate(
        {_id:id},
        {nombre, descripcion, marca, precio, imagenUrl},
        {
          new: true,
          omitUndefined: true
        }
    ).then(productUpdated=>res.json(productUpdated))
},


module.exports = productController