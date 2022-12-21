"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokemon = void 0;
const mongoose_1 = require("mongoose");
const pokemonSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El name es requerido']
    },
    poster: {
        type: String,
        required: [true, 'El poster es requerido']
    },
    typesPokemon: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'TypePokemon'
        }]
    /*types:[{
        typePokemonId:{
            type:String,
            required:[true, 'El typePokemonId es requerido'],
            ref:'types'
        }
    }]*/
});
;
exports.Pokemon = (0, mongoose_1.model)('Pokemon', pokemonSchema);
