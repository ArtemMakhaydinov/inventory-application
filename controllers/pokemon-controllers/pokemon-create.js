const Pokemon = require('../../models/pokemon-model');
const Type = require('../../models/type-model');
const { body, validationResult } = require('express-validator');

// GET

exports.get = (req, res, next) => {
    Type.find({}, 'name')
        .sort({ name: 1 })
        .exec(function (err, types) {
            if (err) {
                return next(err);
            }
            res.render('pokemon-form', {
                title: 'Create Pokemon',
                types,
            });
        });
};

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
];

const queryForRepeats = (req) => {
    return {
        $or: [
            { name: req.body.name },
            {
                $and: [
                    { serial_number: req.body.serial_number },
                    { serial_number: { $ne: null, $ne: undefined } },
                ],
            },
        ],
    };
};

const repeatOrValidErr = (res, errors, repeat, pokemon) => {
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
                errors = errors.Array()
                errors.push(err);
            }

            res.render('pokemon-form', {
                title: 'Create Pokemon',
                types,
                pokemon,
                errors,
            });
        });
};

const createRecord = (req, res, next, pokemon) => {
    pokemon.save((err) => {
        if (err) {
            return next(err);
        }

        res.redirect(pokemon.url);
    });
};

const tryCreateRecord = (req, res, next) => {
    const errors = validationResult(req);

    const pokemon = new Pokemon({
        name: req.body.name,
        serial_number: req.body.serial_number,
        description: req.body.description,
        type: req.body.type,
    });

    Pokemon.findOne(queryForRepeats(req), (err, repeat) => {
        if (err) {
            return next(err);
        }

        if (!errors.isEmpty() || repeat) {
            repeatOrValidErr(res, errors, repeat, pokemon);
        } else {
            createRecord(req, res, next, pokemon);
        }
    });
};

exports.post = [putTypesInArray, postValidation, tryCreateRecord];
