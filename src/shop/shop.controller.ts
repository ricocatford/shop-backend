import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
//SERVICE
import { ShopService } from './shop.service';
//DTO
import CreateShopItemDto from './dto/create-shop-item.dto';
import UpdateShopItemDto from './dto/update-shop-item.dto';
//INTERFACE
import ShopItem from './interfaces/shop-item.interface';

@Controller("shop")
export class ShopController {
    constructor(private readonly shopService: ShopService) { }

    @Get()
    async getAllShopItems(): Promise<ShopItem[]> {
        return this.shopService.getAllShopItems();
    }

    @Get(":id")
    async getSpecificShopItem(@Param("id") id: string) {
        return this.shopService.getSpecificShopItem(id);
    }

    @Post()
    async createShopItem(@Body() createShopItemDto: CreateShopItemDto) {
        return this.shopService.createShopItem(createShopItemDto);
    }

    @Put(":id")
    async modifyShopItem(@Param("id") id: string, @Body() updateShopItemDto: UpdateShopItemDto) {
        return this.shopService.modifyShopItem(id, updateShopItemDto);
    }

    @Delete(":id")
    async deleteShopItem(@Param("id") id: string, @Body() shopItem: any) {
        return this.shopService.deleteShopItem(id, shopItem)
    }
}
