const Pokemon = require('../../models/pokemon-model');
const Type = require('../../models/type-model');
const async = require('async');
const { param } = require('express-validator');

// GET

exports.get = [
    param('id').trim().escape(),

    (req, res, next) => {
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
    },
];

// POST

exports.post = [
    param('id').trim().escape(),

    (req, res, next) => {
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
    },
];
