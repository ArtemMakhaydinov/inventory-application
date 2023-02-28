const Pokemon = require('../../models/pokemon-model');
const { body, param } = require('express-validator');

exports.get = [
    param('id').trim().escape(),

    (req, res, next) => {
        Pokemon.findById(req.params.id, (err, pokemon) => {
            if (err) {
                return next(err);
            }

            if (pokemon === null) {
                res.redirect('/pokedex/pokemons');
            }

            res.render('pokemon-delete', {
                title: 'Delete Pokemon',
                pokemon,
            });
        });
    },
];

exports.post = [
    body('pokemonid').trim().escape(),

    (req, res, next) => {
        Pokemon.findByIdAndRemove(req.body.pokemonid, (err, pokemon) => {
            if (err) {
                return next(err);
            }

            res.redirect('/pokedex/pokemons');
        });
    },
];