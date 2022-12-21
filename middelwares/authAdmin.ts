import { Request, Response, NextFunction } from "express";
import { decode } from "jsonwebtoken";
import Token from "../classes/token";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";


export const AuthAdmin = async (req:any, res:Response, next:NextFunction) =>{

    const userToken = req.get('x-token') || '';

    await Token.validateAdmin(userToken)
    .then(async (decoded:any)=>
    {               
        req.user = decoded.user;
        next();
    }).catch(err=> {
        res.sendStatus(401).json({
            ok:false,
            msj:'Sin Autorizacion'
        })
    })
}