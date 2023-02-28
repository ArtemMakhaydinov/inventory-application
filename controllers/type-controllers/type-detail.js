const Pokemon = require('../../models/pokemon-model');
const Type = require('../../models/type-model');
const async = require('async');
const { param } = require('express-validator');

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
    },
];
