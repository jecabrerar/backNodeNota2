"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    saveImage(file, folder, userId) {
        return new Promise((resolve, reject) => {
            const path = this.CreateFolder(folder, userId);
            const fileName = this.GenFileName(file.name);
            file.mv(`${path}/${fileName}`, (err) => {
                if (err) {
                    console.log(err);
                    reject();
                }
                else {
                    resolve(fileName);
                }
            });
        });
    }
    CreateFolder(folder, userId) {
        const pathFolder = path_1.default.resolve(__dirname, '../images/', folder);
        const temporalPathr = path_1.default.resolve(__dirname, '../temp/', userId);
        const exist = fs_1.default.existsSync(temporalPathr);
        if (!exist) {
            fs_1.default.mkdirSync(pathFolder);
            fs_1.default.mkdirSync(temporalPathr);
        }
    }
    GenFileName(originalName) {
        const nameArray = originalName.split('.');
        const extension = nameArray[nameArray.length - 1];
        const uniqName = (0, uniqid_1.default)();
        return `${uniqName}.${extension}`;
    }
    getTmpImgUrl(userId, img) {
        const pathImg = path_1.default.resolve(__dirname, '../temp', userId, img);
        const exist = fs_1.default.existsSync(pathImg);
        if (!exist) {
            return path_1.default.resolve(__dirname, '../assets/', '400x250.jpg');
        }
        return pathImg;
    }
}
exports.default = FileSystem;
