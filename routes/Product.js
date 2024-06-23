const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product.js');
const res = require('express/lib/response.js');

router.get('/', async (req,res,next) =>{
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        next(err);
    }
})

router.get('/:id', async (req, res,next)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product)
        {
            return res.status(404).json({message:'Product not found!!!'});
        }
        res.json(product);
    } catch (error) {
        next (error);
    }
})

router.put('/:id', async(req,res,next ) =>{
    try {
        const Update = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!Update){
            return res.status(404).json({message:'Product not found!!'});
        }
        res.json(Update);
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', async(req,res,next ) =>{
    try {
        const deleteProd = await Product.findByIdAndDelete(req.params.id);
        if(!deleteProd){
            return res.status(404).json({message:'Product not found!!'});
        }
        res.json({message: 'Product deleted!!'});
    } catch (error) {
        next(error);
    }
})


router.post('/', async(req,res,next)=>{
   try {
    const post = await Product.create(req.body);
    res.json(post);
   } catch (err) {
    next(err);
   }
})

module.exports = router;