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
const pokemonType_model_1 = require("../models/pokemonType.model");
const pokemonTypesRoutes = (0, express_1.Router)();
pokemonTypesRoutes.post('/', (req, res) => {
    const type = {
        pokemonId: req.body.pokemonId,
        typePokemonId: req.body.typePokemonId,
    };
    pokemonType_model_1.PokemonType.create(type).then(pokemonTypeBd => {
        return res.json({
            ok: true,
            pokemonTypeBd
        });
    }).catch(err => {
        return res.json({
            ok: false,
            err
        });
    });
});
pokemonTypesRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const types = yield pokemonType_model_1.PokemonType.find().exec();
    console.log("array-PokemonType", types);
    res.json({
        ok: true,
        types
    });
}));
pokemonTypesRoutes.get('/findByPokemonId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log("body.pokemonId", body.pokemonId);
    const types = yield pokemonType_model_1.PokemonType.find({ pokemonId: body.pokemonId }).exec();
    console.log("array-PokemonType", types);
    res.json({
        ok: true,
        types
    });
}));
exports.default = pokemonTypesRoutes;
