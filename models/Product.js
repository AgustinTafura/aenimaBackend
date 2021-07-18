var mongoose = require('mongoose')
const Schema = mongoose.Schema;
const model = mongoose.model;

const ProductSchema = new Schema({
    id : Schema.Types.ObjectId,
    nombre : {type: String, required: true},
    descripcion : {type: String, required: true},
    precio : {type: Number, required: true},
    marca : {type: String, required: true},
    imagenUrl : {type: String, required: true},
},{
    timestamps: true
})

module.exports = model('Product', ProductSchema)