import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import ShopItem from '../domain/shop-item';
import UpdateShopItemDto from '../domain/dto/update-shop-item.dto';

import { ResultSetHeader } from 'mysql2';
import { UpdateResult } from 'src/shared/result/domain/update.result';


@Injectable()
export class ShopSqlRepository {
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

    async modifyShopItem(id: string, shopItem: UpdateShopItemDto): Promise<UpdateResult> {
        const queryResult: ResultSetHeader = await this.dataSource.query<ResultSetHeader>(`UPDATE products SET name="${shopItem.name}", description="${shopItem.description}", price=${shopItem.price} WHERE id="${id}";`)
        const affectedRows = queryResult.affectedRows;
        if (affectedRows === 0) {
            return UpdateResult.NOT_FOUND;
        }
        return UpdateResult.UPDATED;
    }

    async deleteShopItem(id: string): Promise<UpdateResult> {
        const queryResult: ResultSetHeader = await this.dataSource.query<ResultSetHeader>(`DELETE FROM products WHERE id="${id}";`);
        const affectedRows = queryResult.affectedRows;
        if (affectedRows === 0) {
            return UpdateResult.NOT_FOUND;
        }
        return UpdateResult.UPDATED;
    }
}
