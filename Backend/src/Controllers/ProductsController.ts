import { Request, Response } from "express";
import connection from '../database/connection';
import searchProducts from '../util/searchProducts';

class ProductsController {
    async store(request: Request,response:Response){
        const {description} = request.body;
        const product = await connection('products').insert({description});
        return response.json({description,id:product[0]});
    }
    async index(request: Request,response:Response){
        let products= [];
        let minPriceProducts=[];
        const productsBd = await connection.select('*').from('products');
        for(let p of productsBd){            
            if(p.decription !== null){
           products.push(await searchProducts(p.description));
        }
        }
        for(let index=0;index < products.length;index++ ){
            let minPriceProduct:any;
            for(let index2=0;index2 < products[index].length;index2++){
                if(index2 === 0 ){
                    minPriceProduct = products[index][index2]
                }
                if( products[index][index2].price < minPriceProduct.price){
                    minPriceProduct=products[index][index2];
                }
        }
            minPriceProducts.push(minPriceProduct);
        }
        return response.json(minPriceProducts);
    }
}

export default new ProductsController();