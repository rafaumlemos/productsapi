const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'Solicitação via GET'
    });
});

router.post('/', (req,res,next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Solicitação criada.',
        order: order
    });
});

router.post('/', (req,res,next) => {
    res.status(201).json({
        message: 'Solicitação criada.'
    });
});

router.get('/:orderId', (req,res,next) => {
    res.status(200).json({
        message: 'Detalhes da solicitação',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req,res,next) => {
    res.status(200).json({
        message: 'Solicitação exclúida',
        orderId: req.params.orderId
    });
});

module.exports = router;