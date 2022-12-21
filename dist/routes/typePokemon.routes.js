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
const auth_1 = require("../middelwares/auth");
const authAdmin_1 = require("../middelwares/authAdmin");
const typePokemon_model_1 = require("../models/typePokemon.model");
const typesPokemonRoutes = (0, express_1.Router)();
typesPokemonRoutes.post('/', [authAdmin_1.AuthAdmin], (req, res) => {
    const type = {
        name: req.body.name,
        styleBackGround: req.body.styleBackGround
    };
    typePokemon_model_1.TypePokemon.create(type).then(typeBd => {
        return res.json({
            ok: true,
            typeBd
        });
    }).catch(err => {
        return res.json({
            ok: false,
            err
        });
    });
});
typesPokemonRoutes.put('/', [authAdmin_1.AuthAdmin], (req, res) => {
    const type = {
        _id: req.body._id,
        name: req.body.name,
        styleBackGround: req.body.styleBackGround
    };
    typePokemon_model_1.TypePokemon.findByIdAndUpdate(type._id, type, { new: true }, (err, typeDb) => {
        if (err)
            throw err;
        if (!typeDb) {
            return res.json({
                ok: false,
                msj: "Type Pokemon no existe"
            });
        }
        else {
            res.json({
                ok: true,
                typeDb
            });
        }
    });
});
typesPokemonRoutes.delete('/deleteById/:id', [authAdmin_1.AuthAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const typePokemonId = req.params.id;
    /*let type ={
        _id:typePokemonId
    }*/
    yield typePokemon_model_1.TypePokemon.findByIdAndDelete(typePokemonId)
        .then(() => res.json({ ok: true, msj: 'type pokemon eliminado.' }))
        .catch(err => res.status(400).json({ ok: false, error: err }));
}));
typesPokemonRoutes.get('/findById/:id', [authAdmin_1.AuthAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const typePokemonId = req.params.id;
    //console.log('id:', typePokemonId);
    const type = yield typePokemon_model_1.TypePokemon.findOne({ _id: typePokemonId });
    //console.log('respuesta backen:', type);
    res.json({
        ok: true,
        type
    });
}));
typesPokemonRoutes.post('/findById', [authAdmin_1.AuthAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log('body:', req.body);
    const type = yield typePokemon_model_1.TypePokemon.findOne({ _id: req.body.typePokemonId });
    //console.log('respuesta backen:', type);
    res.json({
        ok: true,
        type
    });
}));
typesPokemonRoutes.get('/', [auth_1.Authentificate], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const types = yield typePokemon_model_1.TypePokemon.find().exec();
    res.json({
        ok: true,
        types
    });
}));
typesPokemonRoutes.get('/pagination', [authAdmin_1.AuthAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let perPage = 5;
    let page = Number(req.query.page) || 1;
    let sort = String(req.query.sort);
    let skip = page - 1;
    skip = skip * perPage;
    let totalDocs = yield typePokemon_model_1.TypePokemon.count();
    let totalPages = Math.ceil(totalDocs / perPage);
    const types = yield typePokemon_model_1.TypePokemon
        .find()
        .limit(perPage)
        .skip(skip)
        .sort({ name: sort == 'asc' ? 1 : -1 })
        .exec();
    res.json({
        ok: true,
        types,
        totalPages
    });
}));
typesPokemonRoutes.get('/search', [authAdmin_1.AuthAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchText = String(req.query.searchText);
    var types = yield typePokemon_model_1.TypePokemon.find({ 'name': { '$regex': searchText, '$options': 'i' } }).exec();
    console.log('searchText:', searchText);
    res.json({
        ok: true,
        types
    });
}));
exports.default = typesPokemonRoutes;
