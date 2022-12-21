import {model, Schema } from "mongoose";

const rolesSchema = new Schema({
    name:{
        type:String,
        required:[true]
    }    
})

interface IRole extends Document{
    name:string;    
};

export const Role = model<IRole>('Role', rolesSchema);
