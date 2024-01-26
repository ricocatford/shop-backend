import { Injectable } from '@nestjs/common';

import ShopItem from './interfaces/shop-item.interface';

import { data } from './database/shop.database';
import UpdateShopItemDto from './dto/update-shop-item.dto';

@Injectable()
export class ShopService {
    getAllShopItems(): ShopItem[] {
        return data;
    }

    getSpecificShopItem(id: string): ShopItem | null {
        const foundItem: ShopItem | null = data.find((item) => item.id === Number(id)) || null
        return foundItem;
    }

    createShopItem(shopItem: ShopItem): ShopItem[] {
        data.push(shopItem);
        return data;
    }

    modifyShopItem(id: string, shopItem: UpdateShopItemDto): ShopItem[] {
        const foundItemIndex: number = data.findIndex((item) => item.id === Number(id))
        let updatedItem = {
            id: Number(id),
            name: shopItem.name,
            description: shopItem.description,
            price: shopItem.price
        }
        data.splice(foundItemIndex, 1, updatedItem)
        return data;
    }

    deleteShopItem(id: string, shopItem: any) {
        const foundItemIndex: number = data.findIndex((item) => item.id === Number(id))
        data.splice(foundItemIndex, 1);
        return data;
    }
}
