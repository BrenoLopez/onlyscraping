import { Request, Response } from "express";
import connection from '../database/connection';

class ProductsController {
    async store(request: Request,response:Response){
        const {description} = request.body;
        const product = await connection('products').insert({description});
        return response.json({description,id:product[0]});
    }
    async index(){
        
    }
}

export default new ProductsController();