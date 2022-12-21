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
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const auth_1 = require("../middelwares/auth");
const userRoutes = (0, express_1.Router)();
userRoutes.post('/', (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        roles: req.body.roles
    };
    //console.log("user",user);
    user_model_1.User.create(user)
        .then(userDb => {
        userDb.populate('roles');
        const token = token_1.default.getJwtToken({
            _id: userDb._id,
            name: userDb.name,
            userDb: userDb.email,
            role: userDb.roles.length > 0 ? userDb.roles[0].name : 'Usuario'
        });
        res.json({
            ok: true,
            token
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
userRoutes.post('/login', (req, res) => {
    console.log("login");
    const body = req.body;
    console.log("login.body", body);
    user_model_1.User.findOne({ email: body.email }, (error, userDb) => {
        if (error) {
            res.json({
                ok: false,
                error
            });
        }
        if (!userDb) {
            res.json({
                ok: false,
                msj: 'Usuario o contraseña incorrectos'
            });
        }
        else {
            console.log(userDb);
            if (userDb.checkPassword(body.password)) {
                const token = token_1.default.getJwtToken({
                    _id: userDb._id,
                    name: userDb.name,
                    email: userDb.email,
                    role: userDb.roles.length > 0 ? userDb.roles[0].name : 'Usuario'
                });
                console.log("token", token);
                res.json({
                    ok: true,
                    token: token
                });
            }
            else {
                res.json({
                    ok: false,
                    msj: 'Usuario o contraseña incorrectos'
                });
            }
        }
    }).populate('roles');
});
userRoutes.put('/update', [auth_1.Authentificate], (req, res) => {
    const user = {
        name: req.body.name || req.user.name,
        email: req.body.email || req.user.email
    };
    //console.log('req.body', req.body); 
    //console.log('user', user);
    user_model_1.User.findByIdAndUpdate(req.user._id, user, { new: true }, (err, userDb) => {
        if (err)
            throw err;
        if (!userDb) {
            return res.json({
                ok: false,
                msj: "Usuario no existe"
            });
        }
        else {
            const token = token_1.default.getJwtToken({
                _id: userDb._id,
                name: userDb.name,
                email: userDb.email,
                role: userDb.roles.length > 0 ? userDb.roles[0].name : 'Usuario'
            });
            res.json({
                ok: true,
                token
            });
        }
    }).populate('roles');
});
userRoutes.get('/checkAdmin', [auth_1.Authentificate], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log('checkAdmin');
    //console.log('x-token', req.get('x-token'));    
    const token = req.get('x-token') || '';
    var resp = yield token_1.default.validateAdmin(token);
    //console.log('resp:', resp);
    res.json({
        ok: resp
    });
}));
userRoutes.post('/asignar', (req, res) => {
    const userId = req.body.userId;
    const roleId = req.body.roleId;
    user_model_1.User.findByIdAndUpdate(userId, { $push: { roles: roleId } }).then(resp => {
        res.json({
            ok: true,
            resp
        });
    });
});
userRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find().populate('roles').exec();
    res.json({
        ok: true,
        users
    });
}));
exports.default = userRoutes;
