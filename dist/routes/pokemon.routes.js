"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authAdmin_1 = require("../middelwares/authAdmin");
const pokemon_model_1 = require("../models/pokemon.model");
const pokemonesRoute = (0, express_1.Router)();
pokemonesRoute.post('/', [authAdmin_1.AuthAdmin], (req, res) => {
    console.log('body', req.body);
    const pokemon = {
        name: req.body.name,
        poster: req.body.poster,
        typesPokemon: req.body.typesPokemon
    };
    pokemon_model_1.Pokemon.create(pokemon)
        .then(pokemonBd => {
        res.json({
            ok: true,
            obj: pokemonBd
        });
    }).catch(err => {
        res.json({
            ok: false,
            obj: err
        });
    });
});
pokemonesRoute.put('/', [authAdmin_1.AuthAdmin], (req, res) => {
    //console.log('body', req.body);
    //console.log('req.body._id', req.body._id);
    const pokemon = {
        _id: req.body._id,
        name: req.body.name,
        poster: req.body.poster,
        typesPokemon: req.body.typesPokemon
    };
    //console.log(pokemon);
    //console.log('req.pokemon._id', pokemon._id); 
    pokemon_model_1.Pokemon.findByIdAndUpdate(pokemon._id, pokemon, { new: true }, (err, pokemonDb) => {
        if (err)
            throw err;
        if (!pokemonDb) {
            return res.json({
                ok: false,
                msj: "Pokemon no existe"
            });
        }
        else {
            res.json({
                ok: true,
                pokemonDb
            });
        }
    });
});
pokemonesRoute.delete('/:id', [authAdmin_1.AuthAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pokemonId = req.params.id;
    console.log('pokemon a elim:', pokemonId);
    yield pokemon_model_1.Pokemon.findByIdAndDelete(pokemonId)
        .then(() => res.json({ ok: true, msj: ' pokemon eliminado.' }))
        .catch(err => res.status(400).json({ ok: false, error: err }));
}));
pokemonesRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let perPage = 6;
    let page = Number(req.query.page) || 1;
    let sort = String(req.query.sort);
    let skip = page - 1;
    skip = skip * perPage;
    let totalDocs = yield pokemon_model_1.Pokemon.count();
    let totalPages = Math.ceil(totalDocs / perPage);
    const pokemones = yield pokemon_model_1.Pokemon.find()
        .populate('typesPokemon')
        .limit(perPage)
        .skip(skip)
        .sort({ name: sort == 'asc' ? 1 : -1 })
        .exec();
    res.json({
        ok: true,
        pokemones,
        totalPages
    });
}));
pokemonesRoute.post('/asignar', [authAdmin_1.AuthAdmin], (req, res) => {
    const pokemonId = req.body.pokemonId;
    const typePokemonId = req.body.typePokemonId;
    console.log('asignar pokemon tipo:', typePokemonId);
    pokemon_model_1.Pokemon.findByIdAndUpdate(pokemonId, { $push: { typesPokemon: typePokemonId } }).then(resp => {
        res.json({
            ok: true,
            resp
        });
    });
});
pokemonesRoute.get('/findById/:id', [authAdmin_1.AuthAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pokemonId = req.params.id;
    console.log('pokemonId:', pokemonId);
    const pokemon = yield pokemon_model_1.Pokemon.findOne({ _id: pokemonId }).populate('typesPokemon').exec();
    console.log('pokemon encontrado en backend:', pokemon);
    res.json({
        ok: true,
        pokemon
    });
}));
pokemonesRoute.get('/search', [authAdmin_1.AuthAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchText = String(req.query.searchText);
    console.log('buscando searchText:', searchText);
    var pokemones = yield pokemon_model_1.Pokemon
        .find({ 'name': { '$regex': searchText, '$options': 'i' } })
        .populate('typesPokemon')
        .exec();
    console.log('pokemones:', pokemones);
    res.json({
        ok: true,
        pokemones
    });
}));
exports.default = pokemonesRoute;
