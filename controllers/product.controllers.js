const productController = {}
const Product  = require("../models/Product")
const fs = require('fs')
var path = require('path');
const axios = require('axios');
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require("constants");
const { response } = require("../app");

async function saveImg(imagenUrl) {
    var regex = /^data:.+\/(.+);base64,(.*)$/;
    var matches = imagenUrl.match(regex); //img format "data:uri"
   
    var fileName;

    if(matches) {

        var ext = matches[1];
        var data = matches[2];
        var buffer = Buffer.from(data, 'base64');
        var fileName = new Date().getTime() + '.' + ext
        try {
            fs.writeFileSync(path.join(__dirname, "../", "public/images/" + fileName), buffer)
            return fileName
        } catch (err) {
            return false
        }


    } else {
        var ext = path.extname(imagenUrl)
        var fileName = new Date().getTime() + ext

        var createStream = fs.createWriteStream(path.join(__dirname, "../", "public/images/" + fileName))
        await axios.get(imagenUrl,{
            responseType: 'stream',
        })
        .then(info=>{ 
            info.data.pipe(createStream)
            return fileName
        })
        .catch(err=> {return false})
        
    }
    return fileName
}

productController.getAllProducts = async( req,res )=>{
    var product = await Product.find()
    res.json(product)
}

productController.getProduct = async( req,res )=>{
    Product.findById(req.params.id).then(product=>res.json(product))
    
}

productController.createProduct = async ( req,res ) => {
    const {nombre, descripcion, marca, precio, imagenUrl} = req.body.product

    var fileName = await saveImg(imagenUrl)

    var product = new Product({
        nombre,
        marca,
        precio,
        descripcion,
        imagenUrl : fileName,
    })

    product.save()
    .then(newProduct =>{
        res.json(newProduct)
    })
    .catch(err=>res.status(400).send(err))
},

productController.deleteProduct = async( req,res ) => {
    const {id} = req.params
    Product.findOneAndDelete({_id:id}).then(productDeleted=>
        res.json({productDeleted, msg:'product Delete'})
    )
    
},

productController.updateProduct = async (req,res) => {
    const {id} = req.params
    const {nombre, descripcion, marca, precio, imagenUrl} = req.body.product
    var fileName = imagenUrl ? await saveImg(imagenUrl) : undefined

    Product.findOneAndUpdate(
        {_id:id},
        {nombre, descripcion, marca, precio, imagenUrl: fileName},
        {
          new: true,
          omitUndefined: true
        }
    ).then(productUpdated=>res.json(productUpdated))
    .then(err=>res.status(400).send(err))
},


module.exports = productController