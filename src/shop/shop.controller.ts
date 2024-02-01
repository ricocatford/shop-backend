import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
//SERVICES
import { ShopService } from './shop.service';
//DTOS
import CreateShopItemDto from './dto/create-shop-item.dto';
import UpdateShopItemDto from './dto/update-shop-item.dto';
//INTERFACES
import ShopItem from './interfaces/shop-item.interface';

@Controller("shop")
export class ShopController {
    constructor(private readonly shopService: ShopService) { }

    @Get()
    async getAllShopItems(): Promise<ShopItem[]> {
        return this.shopService.getAllShopItems();
    }

    @Get(":id")
    async getSpecificShopItem(@Param("id") id: string): Promise<ShopItem> {
        return this.shopService.getSpecificShopItem(id);
    }

    @Post()
    async createShopItem(@Body() createShopItemDto: CreateShopItemDto): Promise<void> {
        return this.shopService.createShopItem(createShopItemDto);
    }

    @Put(":id")
    async modifyShopItem(@Param("id") id: string, @Body() updateShopItemDto: UpdateShopItemDto): Promise<void> {
        return this.shopService.modifyShopItem(id, updateShopItemDto);
    }

    @Delete(":id")
    async deleteShopItem(@Param("id") id: string): Promise<void> {
        return this.shopService.deleteShopItem(id)
    }
}
