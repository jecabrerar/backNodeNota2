import { Request, Response, Router } from "express";
import { Authentificate } from "../middelwares/auth";
import { AuthAdmin } from "../middelwares/authAdmin";
import { TypePokemon } from "../models/typePokemon.model";

const typesPokemonRoutes = Router();

typesPokemonRoutes.post('/',[AuthAdmin], (req:Request , res:Response) =>{

    const type = {
        name: req.body.name,
        styleBackGround: req.body.styleBackGround
    };

    TypePokemon.create(type).then( typeBd=>{
        return res.json({
            ok:true,
            typeBd
        })
    }).catch(err=>{
        return res.json({
            ok:false,
            err
        })
    })    
});

typesPokemonRoutes.put('/',[AuthAdmin], (req:Request , res:Response) =>{

    const type = {
        _id: req.body._id,
        name: req.body.name,
        styleBackGround: req.body.styleBackGround
    };

    TypePokemon.findByIdAndUpdate(type._id, type, {new:true}, (err, typeDb)=>{
        if(err) throw err;
        if(!typeDb){
            return res.json({
                ok:false,
                msj:"Type Pokemon no existe"
            })
        }else{
            res.json({
                ok:true,
                typeDb
            })
        }
    })
});

typesPokemonRoutes.delete('/deleteById/:id',[AuthAdmin], async(req:any, res:any) =>{           
    
    const typePokemonId = req.params.id;
    /*let type ={
        _id:typePokemonId
    }*/
    await TypePokemon.findByIdAndDelete(typePokemonId)
    .then(() => res.json({ok:true,msj:'type pokemon eliminado.'}))
    .catch(err => res.status(400).json({ok:false, error:err}));
});

typesPokemonRoutes.get('/findById/:id',[AuthAdmin], async (req:Request , res:Response) =>{
    const typePokemonId = req.params.id;
    //console.log('id:', typePokemonId);
    const type = await TypePokemon.findOne({_id:typePokemonId});
    //console.log('respuesta backen:', type);
    res.json({
        ok:true,
        type
    })

});

typesPokemonRoutes.post('/findById',[AuthAdmin], async (req:Request , res:Response) =>{

    //console.log('body:', req.body);
    const type = await TypePokemon.findOne({_id:req.body.typePokemonId});
    //console.log('respuesta backen:', type);
    res.json({
        ok:true,
        type
    })
});

typesPokemonRoutes.get('/',[Authentificate], async (req:Request , res:Response) =>{
    const types = await TypePokemon.find().exec();    
        
    res.json({
        ok:true,
        types
    })    
});

typesPokemonRoutes.get('/pagination',[AuthAdmin], async (req:Request , res:Response) =>{
    
    let perPage = 5;
    let page = Number(req.query.page) || 1;
    let sort = String(req.query.sort);
    let skip = page-1;
    skip = skip*perPage;
    let totalDocs = await TypePokemon.count();
    let totalPages = Math.ceil(totalDocs/perPage);
    
    const types = await TypePokemon
    .find()
    .limit(perPage)
    .skip(skip)
    .sort({name:sort=='asc'?1:-1})
    .exec();
    
    res.json({
        ok:true,
        types,
        totalPages
    })
});

typesPokemonRoutes.get('/search', [AuthAdmin], async (req:Request, res: Response)=>{

    const searchText = String(req.query.searchText);
    var types = await TypePokemon.find({'name':{'$regex': searchText, '$options':'i'}}).exec();

    console.log('searchText:', searchText);

    res.json({
        ok:true,
        types
    })
})

export default typesPokemonRoutes;