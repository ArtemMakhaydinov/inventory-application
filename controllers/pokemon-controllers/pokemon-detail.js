const Pokemon = require('../../models/pokemon-model');
const { param } = require('express-validator');

exports.get = [
    param('id').trim().escape(),

    (req, res, next) => {
        Pokemon.findById(req.params.id)
            .populate('type')
            .exec((err, pokemon) => {
                if (err) {
                    return new err();
                }

                if (pokemon === null) {
                    const err = new Error('Pokemon not found.');
                    err.status = 404;
                    return next(err);
                }

                res.render('pokemon-detail', {
                    title: 'Pokemon Detail',
                    pokemon,
                });
            });
    },
];
