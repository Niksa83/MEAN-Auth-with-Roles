"use strict";

const mongoose = require('mongoose');
const helpers = require('../helpers');
 
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    slug: {
        type: String,
        unique: true,
    },
    description : {
        type: String       
    },
    price: { type: Number},
    category : [
        {
            type:Schema.Types.ObjectId, 
            ref:'Category'
        }
    ], // reference to category model  
    }, {
        timestamps: true
    });

CategorySchema.pre('save', function(next){
    this.slug = helpers.slugger(this.name);
    next(); 
});

module.exports = mongoose.model('Product', ProductSchema);