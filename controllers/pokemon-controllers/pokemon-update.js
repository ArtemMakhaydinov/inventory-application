const Pokemon = require('../../models/pokemon-model');
const Type = require('../../models/type-model');
const async = require('async');
const { body, param, validationResult } = require('express-validator');

// GET

exports.get = [
    param('id').trim().escape(),

    (req, res, next) => {
        async.parallel(
            {
                pokemon(callback) {
                    Pokemon.findById(req.params.id)
                        .populate('type')
                        .exec(callback);
                },
                types(callback) {
                    Type.find(callback);
                },
            },
            (err, results) => {
                if (err) {
                    return next(err);
                }

                if (results.pokemon == null) {
                    const err = new Error('Pokemon not found.');
                    err.satatus = 404;
                    return next(err);
                }

                for (const type of results.types)
                    for (const pokemonType of results.pokemon.type)
                        if (
                            type._id.toString() === pokemonType._id.toString()
                        ) {
                            type.checked = true;
                        }

                res.render('pokemon-form', {
                    title: 'Update Pokemon',
                    pokemon: results.pokemon,
                    types: results.types,
                });
            }
        );
    },
];

// POST

const putTypesInArray = (req, res, next) => {
    if (!Array.isArray(req.body.type)) {
        req.body.type =
            typeof req.body.type === 'undefined' ? [] : [req.body.type];
    }
    next();
};

const postValidation = [
    body('name', 'Title must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('serial_number').trim().escape(),
    body('description', 'Description must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('type.*').trim().escape(),
    param('id').trim().escape(),
];

const queryForRepeats = (req) => {
    return {
        $and: [
            { _id: { $ne: req.params.id } },
            {
                $or: [
                    { name: req.body.name },
                    {
                        $and: [
                            { serial_number: req.body.serial_number },
                            {
                                serial_number: {
                                    $ne: null,
                                    $ne: undefined,
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    };
};

const repeatOrValidErr = (res, errors, repeat, pokemon) => {
    errors = errors.isEmpty() ? [] : errors.array();

    Type.find({}, 'name')
        .sort({ name: 1 })
        .exec(function (err, types) {
            if (err) {
                return next(err);
            }

            for (const type of types) {
                if (pokemon.type.includes(type._id)) {
                    type.checked = true;
                }
            }

            if (repeat) {
                const err = new Error(
                    'Pokemon with provided Name or Serial Number already exist.'
                );
                errors.push(err);
            }

            res.render('pokemon-form', {
                title: 'Update Pokemon',
                types,
                pokemon,
                errors,
            });
        });
};

const updateRecord = (req, res, next, pokemon) => {
    Pokemon.findByIdAndUpdate(
        req.params.id,
        pokemon,
        { omitUndefined: true },
        (err, updatedPokemon) => {
            if (err) {
                return next(err);
            }

            res.redirect(updatedPokemon.url);
        }
    );
};

const tryUpdateRecord = (req, res, next) => {
    const errors = validationResult(req);
    const pokemon = new Pokemon({
        name: req.body.name,
        serial_number: req.body.serial_number,
        description: req.body.description,
        type: req.body.type,
        _id: req.params.id,
    });

    Pokemon.findOne(queryForRepeats(req), (err, repeat) => {
        if (err) {
            return next(err);
        }

        if (!errors.isEmpty() || repeat) {
            return repeatOrValidErr(res, errors, repeat, pokemon);
        }

        updateRecord(req, res, next, pokemon);
    });
};

exports.post = [putTypesInArray, postValidation, tryUpdateRecord];
