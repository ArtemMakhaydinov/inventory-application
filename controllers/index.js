const Pokemon = require('../models/pokemon-model');
const Type = require('../models/type-model');
const async = require('async');

exports.get = (req, res, next) => {
    async.parallel(
        {
            pokemonCount(callback) {
                Pokemon.countDocuments({}, callback);
            },
            typeCount(callback) {
                Type.countDocuments({}, callback);
            },
        },
        (err, results) => {
            res.render('index', {
                title: 'Pokedex home page',
                error: err,
                data: results,
            });
        }
    );
};
