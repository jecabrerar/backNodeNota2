import { Router, Request, Response } from "express";
import { Authentificate } from "../middelwares/auth";
import { AuthAdmin } from "../middelwares/authAdmin";
import { Pokemon } from "../models/pokemon.model";


const pokemonesRoute = Router();

pokemonesRoute.post('/',[AuthAdmin], (req:Request, res:Response) =>{
    
    console.log('body', req.body);

    const pokemon = {
        name: req.body.name,        
        poster: req.body.poster,
        typesPokemon: req.body.typesPokemon
    }

    Pokemon.create(pokemon)
    .then(pokemonBd=>{
        res.json({
            ok:true,
            obj:pokemonBd
        })
    }).catch(err=>{
        res.json({
            ok:false,
            obj:err
        })
    })
});

pokemonesRoute.put('/',[AuthAdmin], (req:any, res:any) =>{
    
    //console.log('body', req.body);
    //console.log('req.body._id', req.body._id);
        
    const pokemon = {
        _id: req.body._id,
        name: req.body.name,        
        poster: req.body.poster,
        typesPokemon: req.body.typesPokemon
    }
    //console.log(pokemon);
    //console.log('req.pokemon._id', pokemon._id); 

    Pokemon.findByIdAndUpdate(pokemon._id, pokemon, {new:true}, (err, pokemonDb)=>{
        if(err) throw err;
        if(!pokemonDb){
            return res.json({
                ok:false,
                msj:"Pokemon no existe"
            })
        }else{
            res.json({
                ok:true,
                pokemonDb
            })
        }
    })
    
});


pokemonesRoute.delete('/:id',[AuthAdmin], async (req:any, res:any) =>{
    
    const pokemonId = req.params.id;
    console.log('pokemon a elim:', pokemonId);

    await Pokemon.findByIdAndDelete(pokemonId)
    .then(() => res.json({ok:true,msj:' pokemon eliminado.'}))
    .catch(err => res.status(400).json({ok:false, error:err}));
    
});

pokemonesRoute.get('/', async (req:Request, res:Response) =>{
    

    let perPage = 6;
    let page = Number(req.query.page) || 1;
    let sort = String(req.query.sort);
    let skip = page-1;
    skip = skip*perPage;
    let totalDocs = await Pokemon.count();
    let totalPages = Math.ceil(totalDocs/perPage);

    const pokemones = await Pokemon.find()    
    .populate('typesPokemon')
    .limit(perPage)
    .skip(skip)
    .sort({name:sort=='asc'?1:-1})
    .exec();
    
    
    res.json({
        ok:true,
        pokemones,
        totalPages
    })
});


pokemonesRoute.post('/asignar', [AuthAdmin], (req:Request , res:Response) =>{
    
    const pokemonId = req.body.pokemonId;
    const typePokemonId = req.body.typePokemonId;

    console.log('asignar pokemon tipo:', typePokemonId);

    Pokemon.findByIdAndUpdate(pokemonId, {$push:{typesPokemon:typePokemonId}}).then(resp=>{
        res.json({
            ok:true,
            resp
        });
    })
});


pokemonesRoute.get('/findById/:id',[AuthAdmin], async (req:Request , res:Response) =>{
    const pokemonId = req.params.id;
    console.log('pokemonId:', pokemonId);
    const pokemon = await Pokemon.findOne({_id:pokemonId}).populate('typesPokemon').exec();

    console.log('pokemon encontrado en backend:', pokemon);
    
    res.json({
        ok:true,
        pokemon
    })

});


pokemonesRoute.get('/search', [AuthAdmin], async (req:Request, res: Response)=>{

    const searchText = String(req.query.searchText);

    console.log('buscando searchText:', searchText);

    var pokemones = await Pokemon
    .find({'name':{'$regex': searchText, '$options':'i'}})
    .populate('typesPokemon')
    .exec();

    console.log('pokemones:', pokemones);
    

    res.json({
        ok:true,
        pokemones
    })
})



export default pokemonesRoute;