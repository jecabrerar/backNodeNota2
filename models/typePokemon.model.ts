import { model, Schema } from "mongoose";

const typePokemonSchema = new Schema({
    name:{
        type:String,
        required:[true, 'El name es requerido']
    },
    styleBackGround:{
        type:String,
        required:[true, 'El styleBackGround es requerido']
    }
});

interface ITypePokemon extends Document{
    name:string;
    styleBackGround:string;
}

export const TypePokemon = model<ITypePokemon>('TypePokemon', typePokemonSchema);
