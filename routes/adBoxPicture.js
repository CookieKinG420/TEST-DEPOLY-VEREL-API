const express = require('express');
const router = express.Router();

const adBox = require('../models/adBoxPicture.js');

router.get('/', async (req,res,next)=>{
    try{
        const adBoxPic = await adBox.find();
        res.json(adBoxPic);
    }catch(err){
        next(err);
    }
})

router.delete('/delete/:id', async(req,res,next) =>{
    try{
        const deleteadBoxPic = await adBox.findByIdAndDelete(req.params.id);
        if(!deleteadBoxPic){
            return res.status(404).json({message:'Picture not found!!'});
        }
        res.json({message:'Picture deleted!!'});
    }catch(err){
        next(err)
    }
})

router.put('/edit/:id', async(req, res, next)=> {
    try{
        const update = await adBox.findByIdAndUpdate(req.params.id,req.body, {new: true});
        if(!update){
            return res.status(404).json({message:'Ad not found!!'});
        }
        res.json(update);
    }catch(err){
        next(err);

    }
})

router.post('/create', async (req, res, next)=>{
    try{
        const adPost = await adBox.create(req.body);
        res.json(adPost);
    }catch(err){
        next(err);
    }
})

module.exports = router;