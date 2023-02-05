const Pokemon = require('../models/pokemon-model');
const Type = require('../models/type-model');
const async = require('async');
const { body, param, validationResult } = require('express-validator');

exports.index = (req, res, next) => {
    res.send('index');
};

exports.pokemonList = (req, res, next) => {
    res.send('pokemonList');
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
