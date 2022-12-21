import { Request, Response, NextFunction } from "express";
import { decode } from "jsonwebtoken";
import Token from "../classes/token";
import { Role } from "../models/role.model";


export const Authentificate = async (req:any, res:Response, next:NextFunction) =>{

    const userToken = req.get('x-token') || '';
    
    await Token.validateToken(userToken)
    .then(async (decoded:any)=>{
        //console.log('Decoded', decoded);
        req.user = decoded.user;
        
        next();
    }).catch(err=> {
        /*res.sendStatus(401).json({
            ok:false,
            msj:'Token invalido'
        })*/

        res.json({
            ok:false,
            msj:'Token invalido'
        })
    })
}