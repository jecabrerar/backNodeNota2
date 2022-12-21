import { Router, Request, Response } from "express";

const defaultRoutes = Router();

defaultRoutes.get('/', (req:Request , res:Response) =>{
    return res.json({
        ok:true,
        msj:'todo funciona perfecto'
    })
});

defaultRoutes.post('/', (req:Request , res:Response) =>{
    return res.json({
        ok:true,
        msj:'post OK'
    })
});

export default defaultRoutes;