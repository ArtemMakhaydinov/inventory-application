const Pokemon = require('../models/pokemon-model');
const Type = require('../models/type-model');
const async = require('async');
const { body, param, validationResult } = require('express-validator');

exports.index = (req, res, next) => {
    res.send('index')
};

exports.pokemonList = (req, res, next) => {
    Pokemon.find({}, 'name serial_number')
        .sort({serial_number: 1 })
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

exports.pokemonCreateGet = (req, res, next) => {
    res.send('pokemonCreateGet');
};

exports.pokemonCreatePost = (req, res, next) => {
    res.send('pokemonCreatePost');
};

exports.pokemonDeleteGet = (req, res, next) => {
    res.send('pokemonDeleteGet');
};

exports.pokemonDeletePost = (req, res, next) => {
    res.send('pokemonDeletePost');
};

exports.pokemonUpdateGet = (req, res, next) => {
    res.send('pokemonUpdateGet');
};

exports.pokemonUpdatePost = (req, res, next) => {
    res.send('pokemonUpdatePost');
};

exports.pokemonDetail = (req, res, next) => {
    res.send('pokemonDetail');
};
