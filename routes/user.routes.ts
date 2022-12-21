import { Request, Response, Router } from "express";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt';
import Token from "../classes/token";
import { Authentificate } from "../middelwares/auth";

const userRoutes = Router();

userRoutes.post('/', (req:Request, res:Response)=>{
    
    
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        roles:req.body.roles
    }
    //console.log("user",user);

    User.create(user)
    .then(userDb=>{
        userDb.populate('roles');
        const token = Token.getJwtToken({
            _id:userDb._id,
            name:userDb.name,
            userDb:userDb.email,
            role:userDb.roles.length>0 ? userDb.roles[0].name:'Usuario'
        })

        res.json({
            ok:true,
            token
        })
    }).catch(err=>{
        res.json({
            ok:false,
            err
        })
    })
});

userRoutes.post('/login', (req:Request, res:Response) =>{
    
    console.log("login");    
    const body = req.body;    

    console.log("login.body", body);
    User.findOne({email:body.email}, (error:any, userDb:any)=>{
        if(error) {
            res.json({
                ok:false,
                error
            })
        }
        if(!userDb){
            res.json({
                ok:false,
                msj:'Usuario o contraseña incorrectos'
            })
        }else{
            console.log(userDb);
            if(userDb.checkPassword(body.password)){
                const token = Token.getJwtToken({
                    _id:userDb._id,
                    name:userDb.name,
                    email:userDb.email,
                    role:userDb.roles.length>0 ? userDb.roles[0].name:'Usuario'
                })
                console.log("token", token);
                res.json({
                    ok:true,
                    token:token
                })
            }else{
                res.json({
                    ok:false,
                    msj:'Usuario o contraseña incorrectos'
                })
            }
        }
    }).populate('roles')
});

userRoutes.put('/update', [Authentificate], (req:any, res:Response) =>{
    const user = {
        name: req.body.name || req.user.name,
        email: req.body.email || req.user.email
    }
    //console.log('req.body', req.body); 
    //console.log('user', user);

    User.findByIdAndUpdate(req.user._id, user, {new:true}, (err, userDb)=>{
        if(err) throw err;
        if(!userDb){
            return res.json({
                ok:false,
                msj:"Usuario no existe"
            })
        }else{
            const token = Token.getJwtToken({
                _id:userDb._id,
                name:userDb.name,
                email:userDb.email,
                role:userDb.roles.length>0 ? userDb.roles[0].name:'Usuario'
            })
    
            res.json({
                ok:true,
                token
            })
        }

    }).populate('roles')
});

userRoutes.get('/checkAdmin', [Authentificate], async (req:Request, res:Response) =>{
    //console.log('checkAdmin');
    //console.log('x-token', req.get('x-token'));    

    const token = req.get('x-token') || '';
    var resp = await Token.validateAdmin(token);
    //console.log('resp:', resp);
    res.json({
        ok:resp
    })
});

userRoutes.post('/asignar', (req:Request , res:Response) =>{
    
    const userId = req.body.userId;
    const roleId = req.body.roleId;

    User.findByIdAndUpdate(userId, {$push:{roles:roleId}}).then(resp=>{
        res.json({
            ok:true,
            resp
        });
    })

});

userRoutes.get('/', async (req:Request, res:Response) =>{

    const users = await User.find().populate('roles').exec();

    res.json({
        ok:true,
        users
    })
})


export default userRoutes;