import bodyParser from "body-parser";
import mongoose from "mongoose";
import defaultRoutes from "./routes/default.routes";
import userRoutes from "./routes/user.routes";
import Server from "./classes/server";
import cors from 'cors';
import rolesRoutes from "./routes/role.route";
import pokemonesRoute from "./routes/pokemon.routes";
import typesPokemonRoutes from "./routes/typePokemon.routes";
import SeedDb from "./classes/seedDb";
import filesRoutes from "./routes/file.routes";
//import fileUpload from 'express-fileupload';

const server = new Server();

server.app.use(cors());
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());
//server.app.use(fileUpload);
server.app.use('/', defaultRoutes);
server.app.use('/account', userRoutes);
server.app.use('/pokemons', pokemonesRoute);
server.app.use('/role', rolesRoutes);
server.app.use('/typePokemon', typesPokemonRoutes);
server.app.use('/files', filesRoutes);

mongoose.connect('mongodb://localhost:27017/Nota2-bdpokemon', (error)=>
{
    if(error){
        throw error;
    }

    console.log('Base de datos online');
})

server.Start(async ()=>{
    console.log(`Servidor iniciado en puerto:${server.port}`);
    await SeedDb.seedRole();
})