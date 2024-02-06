import { Injectable } from '@nestjs/common';

import ShopItem from '../domain/shop-item';
import UpdateShopItemDto from '../domain/dto/update-shop-item.dto';

import { ShopSqlRepository } from '../infrastructure/shop.sql.repository';
import { UpdateResult } from 'src/shared/result/domain/update.result';

@Injectable()
export class ShopService {
    constructor(private readonly shopRepository: ShopSqlRepository) { }

    async getAllShopItems(): Promise<ShopItem[]> {
        return this.shopRepository.getAllShopItems();
    }

    async getSpecificShopItem(id: string): Promise<ShopItem> {
        return this.shopRepository.getSpecificShopItem(id);
    }

    async createShopItem(shopItem: ShopItem): Promise<void> {
        this.shopRepository.createShopItem(shopItem);
    }

    async modifyShopItem(id: string, shopItem: UpdateShopItemDto): Promise<UpdateResult> {
        return this.shopRepository.modifyShopItem(id, shopItem)
    }

    async deleteShopItem(id: string): Promise<UpdateResult> {
        return this.shopRepository.deleteShopItem(id);
    }
}
