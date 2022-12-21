import { Role } from "../models/role.model";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt';

export default class SeedDb{
    static async seedRole()
    {
        var roleAdmin = await Role.findOne({name:'administrador'}).exec();
        var users = await User.find().exec();

        if (!roleAdmin){
            var newRole:any = await this.createAdminRole();

            if(users.length  == 0){
                await this.createAdminUser(newRole);
            }

            return;
        }

        if(users.length  == 0){
            await this.createAdminUser(roleAdmin);
        }
        
    }        

    private static async createAdminRole(){
        var newRoleAdmin = {
            name: 'administrador'
        };

        var newRole = await Role.create(newRoleAdmin);

        return newRole;
    }

    private static async createAdminUser(role:any){
        var newAdminToseed ={
            name:'Juan Cabrera',
            email:'jecr2009@gmail.com',
            password: bcrypt.hashSync('123456', 10),
            roles:[role._id]
        }

        console.log('newAdminToseed:',newAdminToseed)

        await User.create(newAdminToseed);
    }

    
}