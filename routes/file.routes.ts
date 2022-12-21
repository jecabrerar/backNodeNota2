import { Request, Response, Router } from "express";
import FileSystem from "../classes/file-system";
import { FileUpload } from "../interfaces/interfaces";
import { AuthAdmin } from "../middelwares/authAdmin";

const filesRoutes = Router();
const fileSystem = new FileSystem();

filesRoutes.post('/', [AuthAdmin], (req:any, res:Response) =>{
    console.log('files.image',req.files.image);

    if (req.files.image){
        return res.status(400).json({
            ok:false,
            msj:'no se adjunto la imagen'
        });
    }

    const file:FileUpload = req.file.image;
    if (!file){
        return res.status(400).json({
            ok:false,
            msj:'no se adjunto la imagen - key'
        });
    }
    
    //var fileName = fileSystem.saveImage(file, folder, req.user._id);
    var fileName = fileSystem.saveImage(file, 'folder cambiar', req.user._id);

    if (!file.mimetype.includes('image')){
        return res.status(400).json({
            ok:false,
            file:fileName
        });
    }
    
    res.json({
        ok:true,
        file: req.files.image
    })
    
});

filesRoutes.get('/tempimagen/:userId/:img', (req:any, res:Response) =>{
    const userId = req.params.userId;
    const img = req.params.image;
    const pathImg = fileSystem.getTmpImgUrl(userId, img);
    res.sendfile(pathImg);
})

export default filesRoutes;