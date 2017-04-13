"use strict";

const mongoose = require('mongoose');
const helpers = require('../helpers');
 
const CategorySchema = new mongoose.Schema({
 
    name: {
        type: String,
        unique: true,
        required: true
    },
    slug: {
        type: String,
        unique: true,
    }
}, {
    timestamps: true
});

CategorySchema.pre('save', function(next){
    this.slug = helpers.slugger(this.name);
    next(); 
});

module.exports = mongoose.model('Category', CategorySchema);