const Pokemon = require('../../models/pokemon-model');

exports.get = (req, res, next) => {
    Pokemon.find({}, 'name serial_number')
        .sort({ serial_number: 1 })
        .exec(function (err, pokemons) {
            if (err) {
                return next(err);
            }
            res.render('pokemon-list', {
                title: 'Pokemon list',
                pokemonList: pokemons,
            });
        });
};
