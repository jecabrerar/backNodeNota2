import jwt from 'jsonwebtoken'
import { User } from '../models/user.model';

export default class Token{
    private static seed:string = 'Esta es la Frase Secreta de La Aplicacoón';
    private static expires:string='1d';

    constructor(){}

    static getJwtToken(payload:any){
        return jwt.sign({
            user:payload
        }, this.seed, {expiresIn:this.expires})
    };

    static async validateToken(userToken:string){
        return new Promise((resolve, reject)=>{
            jwt.verify(userToken, this.seed, (err, decoded)=>{
                if (err){
                    reject();
                }else{
                    resolve(decoded);
                }
            })
        })
    }
    
    static async validateAdmin(userToken:string){
        return new Promise<boolean>((resolve, reject)=>
        {
            //console.log('validando admim');
            jwt.verify(userToken, this.seed, async (err, decoded:any)=>{
                if (err){
                    //console.log('validando admim err:', err);
                    resolve(false);
                    //reject();
                }else{
                    //console.log('token existe');
                    var user = await User.findById(decoded.user._id).populate('roles').exec();
                    if (user){
                        //console.log('token user existe');
                        if (user.roles.length>0){
                            
                            var roleAdmin = user.roles.find((x:any)=> x.name == 'administrador');
                            //console.log('roleAdmin:', roleAdmin);
                            if (roleAdmin)
                            {
                                resolve(true);
                            }else{
                                resolve(false);
                                //reject();
                            }
                        }else{
                            //console.log('sin roles');
                            resolve(false);
                            //reject();
                        }
                    }else{
                        //reject();
                        resolve(false);
                    }
                }
            })            
        });
    }
}