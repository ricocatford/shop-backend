import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
//SERVICES
import { ShopService } from '../application/shop.service';
//DTOS
import CreateShopItemDto from '../domain/dto/create-shop-item.dto';
import UpdateShopItemDto from '../domain/dto/update-shop-item.dto';
//INTERFACES
import ShopItem from '../domain/shop-item';
import { UpdateResult } from 'src/shared/result/domain/update.result';

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
        const result: UpdateResult = await this.shopService.modifyShopItem(id, updateShopItemDto);
        if (result === UpdateResult.NOT_FOUND) {
            throw new HttpException("Not modified.", HttpStatus.NOT_FOUND)
        }
    }

    @Delete(":id")
    async deleteShopItem(@Param("id") id: string): Promise<void> {
        const result: UpdateResult = await this.shopService.deleteShopItem(id);
        if (result === UpdateResult.NOT_FOUND) {
            throw new HttpException("Not modified.", HttpStatus.NOT_FOUND)
        }
    }
}
