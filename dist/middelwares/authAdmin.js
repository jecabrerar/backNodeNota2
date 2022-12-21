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
exports.AuthAdmin = void 0;
const token_1 = __importDefault(require("../classes/token"));
const AuthAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userToken = req.get('x-token') || '';
    yield token_1.default.validateAdmin(userToken)
        .then((decoded) => __awaiter(void 0, void 0, void 0, function* () {
        req.user = decoded.user;
        next();
    })).catch(err => {
        res.sendStatus(401).json({
            ok: false,
            msj: 'Sin Autorizacion'
        });
    });
});
exports.AuthAdmin = AuthAdmin;
