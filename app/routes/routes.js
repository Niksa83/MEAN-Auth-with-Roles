"use strict";

const mongoose = require('mongoose');
const express = require('express');
//const notesController = require('./notes-controller');
const categoriesController = require('./categories-controller');
const usersController = require('./users-controller');

const passportService = require('../../passport/config');
const passport = require('passport');
 
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

/* ============= ROUTING STARTS ==================  */

    const apiRoutes = express.Router(); // final routes we will export
    const authRoutes = express.Router(); // auth only routes
    const categoriesRoutes = express.Router();
    //    todoRoutes = express.Router();

    /*
    * AUTH routes
    */
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/login', requireLogin, usersController.login); // prior is local login
    authRoutes.post('/register', requireAuth, usersController.roleAuthorization(['admin']), usersController.register);
    authRoutes.get('/users', requireAuth, usersController.roleAuthorization(['admin']), usersController.getUsers);
 
    // test protected route
    authRoutes.get('/protected', requireAuth, usersController.roleAuthorization(['editor','admin']), function(req, res){
        res.send({ content: 'Success'});
    });

    // check user role from the client
    authRoutes.post('/role', requireAuth, usersController.roleAuthorization(['editor','admin']), usersController.checkUserRole); // check user role

    /*
    * CATEGORIES routes
    */
    apiRoutes.use('/categories', categoriesRoutes);

    categoriesRoutes.get('/', requireAuth, usersController.roleAuthorization(['editor','admin']), categoriesController.getCategories);
    categoriesRoutes.post('/', requireAuth, usersController.roleAuthorization(['editor','admin']), categoriesController.createCategory);
    categoriesRoutes.delete('/:id', requireAuth, usersController.roleAuthorization(['editor','admin']), categoriesController.deleteCategory);
    
    /*
    apiRoutes.use('/todo', todoRoutes);

    todoRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), TodoController.getTodos);
    todoRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['creator','editor']), TodoController.createTodo);
    todoRoutes.delete('/:todo_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), TodoController.deleteTodo);
        */

//export the router
module.exports = apiRoutes;