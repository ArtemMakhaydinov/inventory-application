const express = require('express');
const router = express.Router();

// const pokemonController = require('../controllers/pokemon-controller');
// const typeController = require('../controllers/type-controller');

const index = require('../controllers/index');

const pokemonList = require('../controllers/pokemon-controllers/pokemon-list');
const pokemonCreate = require('../controllers/pokemon-controllers/pokemon-create');
const pokemonDelete = require('../controllers/pokemon-controllers/pokemon-delete');
const pokemonUpdate = require('../controllers/pokemon-controllers/pokemon-update');
const pokemonDetail = require('../controllers/pokemon-controllers/pokemon-detail');

const typeList = require('../controllers/type-controllers/type-list');
const typeCreate = require('../controllers/type-controllers/type-create');
const typeDelete = require('../controllers/type-controllers/type-delete');
const typeUpdate = require('../controllers/type-controllers/type-update');
const typeDetail = require('../controllers/type-controllers/type-detail');

// POKEMON ROUTES

router.get('/', index.get);

router.get('/pokemon/create', pokemonCreate.get);

router.post('/pokemon/create', pokemonCreate.post);

router.get('/pokemon/:id/delete', pokemonDelete.get);

router.post('/pokemon/:id/delete', pokemonDelete.post);

router.get('/pokemon/:id/update', pokemonUpdate.get);

router.post('/pokemon/:id/update', pokemonUpdate.post);

router.get('/pokemon/:id', pokemonDetail.get);

router.get('/pokemons', pokemonList.get);

// TYPE ROUTES

router.get('/type/create', typeCreate.get);

router.post('/type/create', typeCreate.post);

router.get('/type/:id/delete', typeDelete.get);

router.post('/type/:id/delete', typeDelete.post);

router.get('/type/:id/update', typeUpdate.get);

router.post('/type/:id/update', typeUpdate.post);

router.get('/type/:id', typeDetail.get);

router.get('/types', typeList.get);

module.exports = router;
