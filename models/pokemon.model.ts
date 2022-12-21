import { model, Schema } from "mongoose";

const pokemonSchema = new Schema({    
    name:{
        type:String,
        required:[true, 'El name es requerido']
    },
    poster:{
        type:String,
        required:[true, 'El poster es requerido']
    },
    typesPokemon:[{
        type:Schema.Types.ObjectId,
        ref:'TypePokemon'    
    }]
    /*types:[{
        typePokemonId:{
            type:String,
            required:[true, 'El typePokemonId es requerido'],
            ref:'types'
        }
    }]*/
});

/*interface ITypePokemon extends Document{
    typePokemonId:string,
    _id:string
}*/

interface IPokemon extends Document{
    name:string;
    poster:string;
    typesPokemon:any[];
};



export const Pokemon = model<IPokemon>('Pokemon', pokemonSchema);