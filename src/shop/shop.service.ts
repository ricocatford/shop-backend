import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import ShopItem from './interfaces/shop-item.interface';
import UpdateShopItemDto from './dto/update-shop-item.dto';

import { ResultSetHeader } from 'mysql2';

@Injectable()
export class ShopService {
    constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

    async getAllShopItems(): Promise<ShopItem[]> {
        return this.dataSource.query("SELECT * from products;");
    }

    async getSpecificShopItem(id: string): Promise<ShopItem> {
        return this.dataSource.query(`SELECT * from products WHERE id="${id}";`);
    }

    async createShopItem(shopItem: ShopItem) {
        this.dataSource.query(`INSERT INTO products (id, name, description, price) VALUES("${shopItem.id}", "${shopItem.name}", "${shopItem.description}", ${shopItem.price});`);
    }

    async modifyShopItem(id: string, shopItem: UpdateShopItemDto) {
        const queryResult: ResultSetHeader = await this.dataSource.query<ResultSetHeader>(`UPDATE products SET name="${shopItem.name}", description="${shopItem.description}", price=${shopItem.price} WHERE id="${id}";`)
        const affectedRows = queryResult.affectedRows;
        if (affectedRows === 0) {
            throw new HttpException("Not modified.", HttpStatus.NOT_FOUND)
        }
    }

    async deleteShopItem(id: string) {
        const queryResult: ResultSetHeader = await this.dataSource.query<ResultSetHeader>(`DELETE FROM products WHERE id="${id}";`);
        const affectedRows = queryResult.affectedRows;
        if (affectedRows === 0) {
            throw new HttpException("Not modified.", HttpStatus.NOT_FOUND)
        }
    }
}
