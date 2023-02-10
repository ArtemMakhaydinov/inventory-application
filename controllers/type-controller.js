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
    res.render('type-form', { title: 'Create Type' });
};

exports.typeCreatePost = (req, res, next) => {
    const type = new Type({
        name: req.body.name,
        description: req.body.description,
    });
    type.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect(type.url);
    });
};

exports.typeDeleteGet = (req, res, next) => {
    async.parallel(
        {
            type(callback) {
                Type.findById(req.params.id).exec(callback);
            },
            type_pokemons(callback) {
                Pokemon.find({ type: req.params.id }).exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.type === null) {
                res.redirect('/pokedex/types');
            }
            res.render('type-delete', {
                title: 'Delete Type',
                type: results.type,
                type_pokemons: results.type_pokemons,
            });
        }
    );
};

exports.typeDeletePost = (req, res, next) => {
    async.parallel(
        {
            type(callback) {
                Type.findById(req.body.typeid).exec(callback);
            },
            type_pokemons(callback) {
                Pokemon.find({ type: req.body.typeid }).exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.type_pokemons.length > 0) {
                res.render('type_delete', {
                    title: 'Delete Type',
                    type: results.type,
                    type_pokemons: results.type_pokemons,
                });
            }
            Type.findByIdAndRemove(req.body.typeid, (err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/pokedex/types');
            });
        }
    );
};

exports.typeUpdateGet = (req, res, next) => {
    Type.findById(req.params.id, (err, type) => {
        if (err) {
            return next(err);
        }
        if (type == null) {
            const err = new Error('Type not found.');
            err.status = 404;
            return next(err);
        }
        res.render('type-form', {
            title: 'Update Type',
            type,
        });
    });
};

exports.typeUpdatePost = (req, res, next) => {
    const type = new Type({
        name: req.body.name,
        description: req.body.description,
        _id: req.params.id,
    })

    Type.findByIdAndUpdate(
        req.params.id,
        type,
        {},
        (err, updatedType) => {
            if (err) {
                return next (err)
            }
            res.redirect(updatedType.url)
        }
        )
};

exports.typeDetail = (req, res, next) => {
    async.parallel(
        {
            type(callback) {
                Type.findById(req.params.id).exec(callback);
            },
            type_pokemons(callback) {
                Pokemon.find({ type: req.params.id }).exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.type === null) {
                const err = new Error('Type not found.');
                err.status = 404;
                return next(err);
            }
            res.render('type-detail', {
                title: 'Type Detail',
                type: results.type,
                type_pokemons: results.type_pokemons,
            });
        }
    );
};
