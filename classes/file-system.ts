import { FileUpload } from "../interfaces/interfaces";
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem{
    constructor(){}

    saveImage(file:FileUpload, folder:string, userId:string ){

        return new Promise((resolve, reject)=>{
            const path = this.CreateFolder(folder, userId);
            const fileName = this.GenFileName(file.name);

            file.mv(`${path}/${fileName}`, (err:any)=>{
                if(err){
                    console.log(err);
                    reject();
                }else{
                    resolve(fileName);
                }
            });
        });
    }

    private CreateFolder(folder:string, userId:string){
        const pathFolder = path.resolve(__dirname, '../images/', folder);
        const temporalPathr = path.resolve(__dirname, '../temp/', userId);
        
        const exist = fs.existsSync(temporalPathr);
        if (!exist){
            fs.mkdirSync(pathFolder);
            fs.mkdirSync(temporalPathr);
        }
    }

    private GenFileName(originalName:string){
        const nameArray = originalName.split('.');
        const extension = nameArray[nameArray.length-1];
        const uniqName = uniqid();

        return `${uniqName}.${extension}`;
    }

    public getTmpImgUrl(userId:string, img:string){
        const pathImg = path.resolve(__dirname, '../temp', userId, img);
        const exist = fs.existsSync(pathImg);

        if (!exist){
            return path.resolve(__dirname, '../assets/', '400x250.jpg');
        }

        return pathImg;

    }
}