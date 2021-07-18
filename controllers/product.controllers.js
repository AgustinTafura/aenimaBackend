const productController = {}
const Product  = require("../models/Product")


productController.getAllProducts = async( req,res )=>{
    var product = await Product.find()
    res.json(product)
}

productController.getProduct = async( req,res )=>{
    var product = await Product.findById(req.params.id)
    res.json(product)
}

productController.createProduct = async ( req,res ) => {
    const {nombre, descripcion, marca, precio, imagenUrl} = req.body

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
    await Product.findOneAndDelete(req.params.id)
    res.json('product Delete')
},

productController.updateProduct = async (req,res) => {
    const {nombre, descripcion, marca, precio, imagenUrl} = req.body
    await Product.findOneAndUpdate(
        req.params.id,
        {nombre, descripcion, marca, precio, imagenUrl},
        {
          new: true,
          omitUndefined: true
        })
    res.json('product Updated')
},


module.exports = productController