const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    marca: {type: String, required: true},
    modelo: {type: String, required: true},
    price: {type: Number, required: true},
    productImage: {type: Array, required: true}
});

module.exports = mongoose.model('Product', productSchema);