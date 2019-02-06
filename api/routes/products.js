const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');
const multer = require ('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './uploads/');
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null,true);
    }else{
        cb(null,false);
    }
};

const upload = multer({storage: storage,
    limits:{
    fileSize: 1000000
    },
    fileFilter: fileFilter
});

router.get('/', (req,res,next) => {
    Product.find()
    .select('-_v')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc =>{
                return {
                    marca: doc.marca,
                    modelo: doc.modelo,
                    price: doc.price,
                    productImage: doc.productImage[0],
                    _id: doc.id,
                    url: "http://localhost:3000/products/"+doc.id   
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:productMarca', (req,res,next) => {
    const marca = req.params.productMarca;
    var query = {marca: marca};
    console.log(query);
    Product.find(query)
    .select('-_v')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc =>{
                return {
                    marca: doc.marca,
                    modelo: doc.modelo,
                    price: doc.price,
                    productImage: doc.productImage[0],
                    _id: doc.id,
                    url: "http://localhost:3000/products/"+doc.id   
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/',checkAuth, upload.any('productImage'), (req,res,next) => {
    console.log(req.files);
    var data = req.files;
    var id = data.map(function(par){
        return par.path;
    });
    console.log(id);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        marca: req.body.marca,
        modelo: req.body.modelo,
        price: req.body.price,
        productImage: id
    });

    product.save().then( result => {
        res.status(201).json({
            message: 'Produto adicionado com sucesso.',
            createdProduct: {
                marca: result.marca,
                modelo: result.modelo,
                price: result.price,
                _id: result.id,
                url: "http://localhost:3000/products/"+result.id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('-__v')
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message: "Produto não encontrado."});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Produto atualizado',
            url: 'http://localhost:3000/products'+ id
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Produto excluído'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;