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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_model_1 = require("../models/role.model");
const rolesRoutes = (0, express_1.Router)();
rolesRoutes.post('/', (req, res) => {
    const role = {
        name: req.body.name
    };
    //console.log("role", role); 
    role_model_1.Role.create(role).then(rol => {
        return res.json({
            ok: true,
            rol
        });
    }).catch(err => {
        return res.json({
            ok: false,
            err
        });
    });
});
rolesRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_model_1.Role.find().exec();
    res.json({
        ok: true,
        roles
    });
}));
exports.default = rolesRoutes;
