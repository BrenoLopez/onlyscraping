import { Request, Response } from "express";
import connection from '../database/connection';
import searhProducts from '../util/searchProducts';

class ProductsController {
    async store(request: Request,response:Response){
        const {description} = request.body;
        const product = await connection('products').insert({description});
        return response.json({description,id:product[0]});
    }
    async index(request: Request,response:Response){
        const products= [];
        const productsBd = await connection.select('*').from('products');
        for(let p of productsBd){
            if(p.decription !== null){
           products.push(await searhProducts(p.description))}
        }
        return response.json(products);
    }
}

export default new ProductsController();