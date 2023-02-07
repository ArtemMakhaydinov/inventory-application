const Pokemon = require('../models/pokemon-model');
const Type = require('../models/type-model');
const async = require('async');
const { body, param, validationResult } = require('express-validator');

exports.typeList = (req, res, next) => {
    Type.find({}, 'name')
        .sort({ name: 1 })
        .exec(function (err, types) {
            if (err) {
                return next(err);
            }
            res.render('type-list', {
                title: 'Type list',
                typeList: types,
            });
        });
};

exports.typeCreateGet = (req, res, next) => {
    res.send('typeCreateGet');
};

exports.typeCreatePost = (req, res, next) => {
    res.send('typeCreatePost');
};

exports.typeDeleteGet = (req, res, next) => {
    res.send('typeDeleteGet');
};

exports.typeDeletePost = (req, res, next) => {
    res.send('typeDeletePost');
};

exports.typeUpdateGet = (req, res, next) => {
    res.send('typeUpdateGet');
};

exports.typeUpdatePost = (req, res, next) => {
    res.send('typeUpdatePost');
};

exports.typeDetail = (req, res, next) => {
    res.send('typeDetail');
};
