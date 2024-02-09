import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ResultSetHeader } from 'mysql2';

import Product from '../domain/product';
import { UpdateProductDto } from '../domain/dto/update-product.dto';
import { CreateProductDto } from '../domain/dto/create-product.dto';
import { UpdateResult } from 'src/shared/result/domain/update.result';
import { ShopRepository } from '../domain/shop-repository';

@Injectable()
export class ShopSqlRepository implements ShopRepository {
    constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

    async getAllProducts(): Promise<Product[]> {
        return this.dataSource.query("SELECT * from products;");
    }

    async getProductById(id: string): Promise<Product> {
        return this.dataSource.query(`SELECT * from products WHERE id="${id}";`);
    }

    async createProduct(product: CreateProductDto) {
        this.dataSource.query(`INSERT INTO products (id, name, description, price) VALUES("${product.id}", "${product.name}", "${product.description}", ${product.price});`);
    }

    async modifyProductById(id: string, product: UpdateProductDto): Promise<UpdateResult> {
        const queryResult: ResultSetHeader = await this.dataSource.query<ResultSetHeader>(`UPDATE products SET name="${product.name}", description="${product.description}", price=${product.price} WHERE id="${id}";`)
        const affectedRows = queryResult.affectedRows;
        if (affectedRows === 0) {
            return UpdateResult.NotFound;
        }
        return UpdateResult.Updated;
    }

    async deleteProductById(id: string): Promise<UpdateResult> {
        const queryResult: ResultSetHeader = await this.dataSource.query<ResultSetHeader>(`DELETE FROM products WHERE id="${id}";`);
        const affectedRows = queryResult.affectedRows;
        if (affectedRows === 0) {
            return UpdateResult.NotFound;
        }
        return UpdateResult.Updated;
    }
}
