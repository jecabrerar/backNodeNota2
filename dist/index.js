"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const default_routes_1 = __importDefault(require("./routes/default.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const server_1 = __importDefault(require("./classes/server"));
const cors_1 = __importDefault(require("cors"));
const role_route_1 = __importDefault(require("./routes/role.route"));
const pokemon_routes_1 = __importDefault(require("./routes/pokemon.routes"));
const typePokemon_routes_1 = __importDefault(require("./routes/typePokemon.routes"));
const seedDb_1 = __importDefault(require("./classes/seedDb"));
const file_routes_1 = __importDefault(require("./routes/file.routes"));
//import fileUpload from 'express-fileupload';
const server = new server_1.default();
server.app.use((0, cors_1.default)());
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//server.app.use(fileUpload);
server.app.use('/', default_routes_1.default);
server.app.use('/account', user_routes_1.default);
server.app.use('/pokemons', pokemon_routes_1.default);
server.app.use('/role', role_route_1.default);
server.app.use('/typePokemon', typePokemon_routes_1.default);
server.app.use('/files', file_routes_1.default);
mongoose_1.default.connect('mongodb://localhost:27017/Nota2-bdpokemon', (error) => {
    if (error) {
        throw error;
    }
    console.log('Base de datos online');
});
server.Start(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Servidor iniciado en puerto:${server.port}`);
    yield seedDb_1.default.seedRole();
}));
