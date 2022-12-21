"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypePokemon = void 0;
const mongoose_1 = require("mongoose");
const typePokemonSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El name es requerido']
    },
    styleBackGround: {
        type: String,
        required: [true, 'El styleBackGround es requerido']
    }
});
exports.TypePokemon = (0, mongoose_1.model)('TypePokemon', typePokemonSchema);
