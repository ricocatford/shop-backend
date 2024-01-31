import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import ShopItem from './interfaces/shop-item.interface';
import UpdateShopItemDto from './dto/update-shop-item.dto';

import { data } from './database/shop.database';

@Injectable()
export class ShopService {
    constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

    async getAllShopItems(): Promise<ShopItem[]> {
        return this.dataSource.query("SELECT * from products;");
    }

    getSpecificShopItem(id: string): ShopItem | null {
        const foundItem: ShopItem | null = data.find((item) => item.id === Number(id)) || null
        return foundItem;
    }

    createShopItem(shopItem: ShopItem) {
        data.push(shopItem);
    }

    modifyShopItem(id: string, shopItem: UpdateShopItemDto) {
        const foundItemIndex: number = data.findIndex((item) => item.id === Number(id))
        let updatedItem = {
            id: Number(id),
            name: shopItem.name,
            description: shopItem.description,
            price: shopItem.price
        }
        data.splice(foundItemIndex, 1, updatedItem)
    }

    deleteShopItem(id: string) {
        const foundItemIndex: number = data.findIndex((item) => item.id === Number(id))
        if (foundItemIndex === -1) {
            throw new HttpException('This id doesn\'t exist', HttpStatus.NOT_FOUND)
        }
        data.splice(foundItemIndex, 1);
    }
}
