const Pokemon = require('../models/pokemon-model');
const Type = require('../models/type-model');
const async = require('async');
const { body, param, validationResult } = require('express-validator');

// exports.index = (req, res, next) => {
//     async.parallel(
//         {
//             pokemonCount(callback) {
//                 Pokemon.countDocuments({}, callback);
//             },
//             typeCount(callback) {
//                 Type.countDocuments({}, callback);
//             },
//         },
//         (err, results) => {
//             res.render('index', {
//                 title: 'Pokedex home page',
//                 error: err,
//                 data: results,
//             });
//         }
//     );
// };

// exports.pokemonList = (req, res, next) => {
//     Pokemon.find({}, 'name serial_number')
//         .sort({ serial_number: 1 })
//         .exec(function (err, pokemons) {
//             if (err) {
//                 return next(err);
//             }
//             res.render('pokemon-list', {
//                 title: 'Pokemon list',
//                 pokemonList: pokemons,
//             });
//         });
// };

// exports.pokemonCreateGet = [
//     param('id').trim().escape(),

//     (req, res, next) => {
//         Type.find({}, 'name')
//             .sort({ name: 1 })
//             .exec(function (err, types) {
//                 if (err) {
//                     return next(err);
//                 }
//                 res.render('pokemon-form', {
//                     title: 'Create Pokemon',
//                     types,
//                 });
//             });
//     },
// ];

// exports.pokemonCreatePost = [
//     (req, res, next) => {
//         if (!Array.isArray(req.body.type)) {
//             req.body.type =
//                 typeof req.body.type === 'undefined' ? [] : [req.body.type];
//         }
//         next();
//     },

//     body('name', 'Title must not be empty.')
//         .trim()
//         .isLength({ min: 1 })
//         .escape(),
//     body('serial_number').trim().escape(),
//     body('description', 'Description must not be empty.')
//         .trim()
//         .isLength({ min: 1 })
//         .escape(),
//     body('type.*').trim().escape(),

//     (req, res, next) => {
//         const errors = validationResult(req);

//         const pokemon = new Pokemon({
//             name: req.body.name,
//             serial_number: req.body.serial_number,
//             description: req.body.description,
//             type: req.body.type,
//         });

//         if (!errors.isEmpty()) {
//             Type.find({}, 'name')
//                 .sort({ name: 1 })
//                 .exec(function (err, types) {
//                     if (err) {
//                         return next(err);
//                     }

//                     for (const type of types) {
//                         if (pokemon.type.includes(type._id)) {
//                             type.checked = true;
//                         }
//                     }

//                     res.render('pokemon-form', {
//                         title: 'Create Pokemon',
//                         types,
//                         pokemon,
//                         errors: errors.array(),
//                     });
//                 });
//             return;
//         }

//         Pokemon.findOne(
//             {
//                 $or: [
//                     { name: req.body.name },
//                     {
//                         $and: [
//                             { serial_number: req.body.serial_number },
//                             { serial_number: { $ne: null, $ne: undefined } },
//                         ],
//                     },
//                 ],
//             },
//             (err, found_pokemon) => {
//                 if (err) {
//                     return next(err);
//                 }

//                 if (found_pokemon) {
//                     res.redirect(found_pokemon.url);
//                 } else {
//                     pokemon.save((err) => {
//                         if (err) {
//                             return next(err);
//                         }

//                         res.redirect(pokemon.url);
//                     });
//                 }
//             }
//         );
//     },
// ];

// exports.pokemonDeleteGet = [
//     param('id').trim().escape(),

//     (req, res, next) => {
//         Pokemon.findById(req.params.id, (err, pokemon) => {
//             if (err) {
//                 return next(err);
//             }

//             if (pokemon === null) {
//                 res.redirect('/pokedex/pokemons');
//             }

//             res.render('pokemon-delete', {
//                 title: 'Delete Pokemon',
//                 pokemon,
//             });
//         });
//     },
// ];

// exports.pokemonDeletePost = [
//     body('pokemonid').trim().escape(),

//     (req, res, next) => {
//         Pokemon.findByIdAndRemove(req.body.pokemonid, (err, pokemon) => {
//             if (err) {
//                 return next(err);
//             }

//             res.redirect('/pokedex/pokemons');
//         });
//     },
// ];

// exports.pokemonUpdateGet = [
//     param('id').trim().escape(),

//     (req, res, next) => {
//         async.parallel(
//             {
//                 pokemon(callback) {
//                     Pokemon.findById(req.params.id)
//                         .populate('type')
//                         .exec(callback);
//                 },
//                 types(callback) {
//                     Type.find(callback);
//                 },
//             },
//             (err, results) => {
//                 if (err) {
//                     return next(err);
//                 }

//                 if (results.pokemon == null) {
//                     const err = new Error('Pokemon not found.');
//                     err.satatus = 404;
//                     return next(err);
//                 }

//                 for (const type of results.types)
//                     for (const pokemonType of results.pokemon.type)
//                         if (
//                             type._id.toString() === pokemonType._id.toString()
//                         ) {
//                             type.checked = true;
//                         }

//                 res.render('pokemon-form', {
//                     title: 'Update Pokemon',
//                     pokemon: results.pokemon,
//                     types: results.types,
//                 });
//             }
//         );
//     },
// ];

// exports.pokemonUpdatePost = [
//     (req, res, next) => {
//         if (!Array.isArray(req.body.type)) {
//             req.body.type =
//                 typeof req.body.type === 'undefined' ? [] : [req.body.type];
//         }
//         next();
//     },

//     body('name', 'Title must not be empty.')
//         .trim()
//         .isLength({ min: 1 })
//         .escape(),
//     body('serial_number').trim().escape(),
//     body('description', 'Description must not be empty.')
//         .trim()
//         .isLength({ min: 1 })
//         .escape(),
//     body('type.*').trim().escape(),
//     param('id').trim().escape(),

//     (req, res, next) => {
//         const errors = validationResult(req);
//         const errorsArray = errors.array();

//         const pokemon = new Pokemon({
//             name: req.body.name,
//             serial_number: req.body.serial_number,
//             description: req.body.description,
//             type: req.body.type,
//             _id: req.params.id,
//         });

//         Pokemon.findOne(
//             {
//                 $and: [
//                     { _id: { $ne: req.params.id } },
//                     {
//                         $or: [
//                             { name: req.body.name },
//                             {
//                                 $and: [
//                                     { serial_number: req.body.serial_number },
//                                     {
//                                         serial_number: {
//                                             $ne: null,
//                                             $ne: undefined,
//                                         },
//                                     },
//                                 ],
//                             },
//                         ],
//                     },
//                 ],
//             },
//             (err, found_pokemon) => {
//                 if (err) {
//                     return next(err);
//                 }

//                 if (!errors.isEmpty() || found_pokemon) {
//                     Type.find({}, 'name')
//                         .sort({ name: 1 })
//                         .exec(function (err, types) {
//                             if (err) {
//                                 return next(err);
//                             }

//                             for (const type of types) {
//                                 if (pokemon.type.includes(type._id)) {
//                                     type.checked = true;
//                                 }
//                             }

//                             if (found_pokemon) {
//                                 const err = new Error(
//                                     'Pokemon with provided Name or Serial Number already exist.'
//                                 );
//                                 errorsArray.push(err);
//                             }

//                             res.render('pokemon-form', {
//                                 title: 'Update Pokemon',
//                                 types,
//                                 pokemon,
//                                 errors: errorsArray,
//                             });
//                         });
//                 } else {
//                     Pokemon.findByIdAndUpdate(
//                         req.params.id,
//                         pokemon,
//                         { omitUndefined: true },
//                         (err, updatedPokemon) => {
//                             if (err) {
//                                 return next(err);
//                             }

//                             res.redirect(updatedPokemon.url);
//                         }
//                     );
//                 }
//             }
//         );
//     },
// ];

// exports.pokemonDetail = (req, res, next) => {
//     Pokemon.findById(req.params.id)
//         .populate('type')
//         .exec((err, pokemon) => {
//             if (err) {
//                 return new err();
//             }

//             if (pokemon === null) {
//                 const err = new Error('Pokemon not found.');
//                 err.status = 404;
//                 return next(err);
//             }

//             res.render('pokemon-detail', {
//                 title: 'Pokemon Detail',
//                 pokemon,
//             });
//         });
// };
