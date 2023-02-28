const Type = require('../../models/type-model');
const { body, validationResult } = require('express-validator');

// GET

exports.get = (req, res, next) => {
    res.render('type-form', { title: 'Create Type' });
};

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
    if (repeat) {
        const err = new Error(
            'Type with provided Name already exist.'
        );
        errors = errors.Array()
        errors.push(err);
    }

    res.render('type-form', {
        title: 'Create Type',
        type,
        errors,
    });
}

const createRecord = (req, res, next, type) => {
    type.save((err) => {
        if (err) {
            return next(err);
        }

        res.redirect(type.url);
    });
}

const tryCreateRecord = (req, res, next) => {
    const errors = validationResult(req);

    const type = new Type({
        name: req.body.name,
        description: req.body.description,
    });

    Type.findOne({ name: req.body.name }, (err, repeat) => {
        if (err) {
            return next(err);
        }

        if (!errors.isEmpty() || repeat) {
            repeatOrValidErr(res, errors, repeat, type);
        } else {
            createRecord(req, res, next, type)
        }
    });
};

exports.post = [postValidation, tryCreateRecord];
