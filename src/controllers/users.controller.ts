import userCreateService from '../services/users/users.create.service';
import userUpdateService from '../services/users/user.update.service';
import userDeleteService from '../services/users/user.delete.service';
import userIndexService from '../services/users/user.index.service';
import userLoginService from '../services/users/user.login.service';
import userListService from '../services/users/users.list.service';
import { IUserResponse } from '../interfaces/User/user.interface';
import {Request, Response} from 'express';

export default class UserController {
    static store = async(request: Request, response: Response) => {
        const requestContent = request.body;
        const createdUser = await userCreateService(requestContent);

        return response.status(201).json(createdUser);
    }
 
    static list = async(request: Request, response: Response) => {
        const users = await userListService();

        const dataUsers: IUserResponse[] = []
        users.forEach(item => {
            const {password, ...itemElement} = item
            dataUsers.push(itemElement)
        })

        return response.json(dataUsers);
    }
 
    static index = async(request: Request, response: Response) => {
        const {user_id} = request.params;
        const user = await userIndexService({user_id});

        return response.json(user);
    }
 
    static update = async(request: Request, response: Response) => {
        const {user_id} = request.params;
        const dataToUpdate = request.body;
        try{
            const updatedUser = await userUpdateService({user_id, ...dataToUpdate});
            return response.json(updatedUser);
        }catch(err){
            console.log(err, "<---")
            // return response.send(err);
        }

    }
 
    static delete = async(request: Request, response: Response) => {
        const {user_id} = request.params;
        const deletedUser = await userDeleteService({user_id});
        
        return response.status(204).json()
    }

    static login = async(request:Request, response: Response) => {
        const {email, password} =  request.body;
        const token = await userLoginService({email, password});
        
        return response.json(token)
    }
 
};