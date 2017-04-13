"use strict";

const Category = require('../models/category');

exports.createCategory = function(req, res, next){
        // Creates a new Category
        let newCategory = new Category();
            newCategory.name = req.body.name;

        // Save it into the DB.
        newCategory.save((err, category) => {
            if(err) {
                res.send(err);
            }
            else { 
                res.json({message: "Category successfully added!", category });
            }
        }); 
}

exports.getCategories = function(req,res,next){
        //Query the DB and if no errors, send all the categories
        let query = Category.find({});
        query.exec((err, categories) => {
            if(err) res.send(err);
            //If no errors, send them back to the client
            res.json({ data: categories });
        });      
}

exports.deleteCategory = function(req,res,next){
    Category.remove({ _id: req.params.id }, (err, result) => {
        res.json({ message: "Category successfully deleted!", result });
    });
}
