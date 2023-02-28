const Pokemon = require('../../models/pokemon-model');
const Type = require('../../models/type-model');
const async = require('async');
const { body, param, validationResult } = require('express-validator');

// GET

exports.get = [
    param('id').trim().escape(),

    (req, res, next) => {
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
    },
];

// POST

const postValidation = [
    body('name', 'Title must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('description', 'Description must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
];

const repeatOrValidErr = (res, errors, repeat, type) => {
    errors = errors.array();

    if (repeat) {
        const err = new Error('Type with provided Name already exist.');
        errors.push(err);
    }

    res.render('type-form', {
        title: 'Create Type',
        type,
        errors,
    });
};

const updateRecord = (req, res, next, type) => {
    Type.findByIdAndUpdate(req.params.id, type, {}, (err, updatedType) => {
        if (err) {
            return next(err);
        }

        res.redirect(updatedType.url);
    });
};

const tryUpdateRecord = (req, res, next) => {
    const errors = validationResult(req);
    const type = new Type({
        name: req.body.name,
        description: req.body.description,
        _id: req.params.id,
    });

    Type.findOne(
        { name: req.body.name },
        { _id: req.params.id },
        (err, repeat) => {
            if (err) {
                return next(err);
            }

            if (!errors.isEmpty() || repeat) {
                repeatOrValidErr(res, errors, repeat, type);
            } else {
                updateRecord(req, res, next, type);
            }
        }
    );
};

exports.post = [postValidation, tryUpdateRecord];
