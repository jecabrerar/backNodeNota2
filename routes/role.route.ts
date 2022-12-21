import { Router, Request, Response } from "express";
import { Authentificate } from "../middelwares/auth";
import { AuthAdmin } from "../middelwares/authAdmin";
import { Role } from "../models/role.model";


const rolesRoutes = Router();

rolesRoutes.post('/', (req:Request , res:Response) =>{

    const role = {
        name: req.body.name
    };

    //console.log("role", role); 

    Role.create(role).then( rol=>{
        return res.json({
            ok:true,
            rol
        })
    }).catch(err=>{
        return res.json({
            ok:false,
            err
        })
    })
    
});

rolesRoutes.get('/',  async (req:Request , res:Response) =>{

    const roles = await Role.find().exec();
    res.json({
        ok:true,
        roles
    })

});


export default rolesRoutes;