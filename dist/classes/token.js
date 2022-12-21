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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
class Token {
    constructor() { }
    static getJwtToken(payload) {
        return jsonwebtoken_1.default.sign({
            user: payload
        }, this.seed, { expiresIn: this.expires });
    }
    ;
    static validateToken(userToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(userToken, this.seed, (err, decoded) => {
                    if (err) {
                        reject();
                    }
                    else {
                        resolve(decoded);
                    }
                });
            });
        });
    }
    static validateAdmin(userToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                //console.log('validando admim');
                jsonwebtoken_1.default.verify(userToken, this.seed, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        //console.log('validando admim err:', err);
                        resolve(false);
                        //reject();
                    }
                    else {
                        //console.log('token existe');
                        var user = yield user_model_1.User.findById(decoded.user._id).populate('roles').exec();
                        if (user) {
                            //console.log('token user existe');
                            if (user.roles.length > 0) {
                                var roleAdmin = user.roles.find((x) => x.name == 'administrador');
                                //console.log('roleAdmin:', roleAdmin);
                                if (roleAdmin) {
                                    resolve(true);
                                }
                                else {
                                    resolve(false);
                                    //reject();
                                }
                            }
                            else {
                                //console.log('sin roles');
                                resolve(false);
                                //reject();
                            }
                        }
                        else {
                            //reject();
                            resolve(false);
                        }
                    }
                }));
            });
        });
    }
}
exports.default = Token;
Token.seed = 'Esta es la Frase Secreta de La Aplicacoón';
Token.expires = '1d';
