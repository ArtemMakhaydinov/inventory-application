const express = require('express');
const router = express.Router();

const pokemonController = require('../controllers/pokemon-controller');
const typeController = require('../controllers/type-controller');

// POKEMON ROUTES

router.get('/', pokemonController.index);

router.get('/pokemons', pokemonController.pokemonList);

router.get('/pokemon/create', pokemonController.pokemonCreateGet);

router.post('/pokemon/create', pokemonController.pokemonCreatePost);

router.get('/pokemon/:id/delete', pokemonController.pokemonDeleteGet);

router.post('/pokemon/:id/delete', pokemonController.pokemonDeletePost);

router.get('./pokemon/:id/update', pokemonController.pokemonUpdateGet);

router.post('./pokemon/:id/update', pokemonController.pokemonUpdatePost);

router.get('./pokemon/:id', pokemonController.pokemonDetail);

// TYPE ROUTES

router.get('/types', typeController.typeList);

router.get('/type/create', typeController.typeCreateGet);

router.post('/type/create', typeController.typeCreatePost);

router.get('/type/:id/delete', typeController.typeDeleteGet);

router.post('/type/:id/delete', typeController.typeDeletePost);

router.get('/type/:id/update', typeController.typeUpdateGet);

router.post('/type/:id/update', typeController.typeUpdatePost);

router.get('/type/:id', typeController.typeDetail);
