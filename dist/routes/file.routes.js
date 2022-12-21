"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_system_1 = __importDefault(require("../classes/file-system"));
const authAdmin_1 = require("../middelwares/authAdmin");
const filesRoutes = (0, express_1.Router)();
const fileSystem = new file_system_1.default();
filesRoutes.post('/', [authAdmin_1.AuthAdmin], (req, res) => {
    console.log('files.image', req.files.image);
    if (req.files.image) {
        return res.status(400).json({
            ok: false,
            msj: 'no se adjunto la imagen'
        });
    }
    const file = req.file.image;
    if (!file) {
        return res.status(400).json({
            ok: false,
            msj: 'no se adjunto la imagen - key'
        });
    }
    //var fileName = fileSystem.saveImage(file, folder, req.user._id);
    var fileName = fileSystem.saveImage(file, 'folder cambiar', req.user._id);
    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            file: fileName
        });
    }
    res.json({
        ok: true,
        file: req.files.image
    });
});
filesRoutes.get('/tempimagen/:userId/:img', (req, res) => {
    const userId = req.params.userId;
    const img = req.params.image;
    const pathImg = fileSystem.getTmpImgUrl(userId, img);
    res.sendfile(pathImg);
});
exports.default = filesRoutes;
