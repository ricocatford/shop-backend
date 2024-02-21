import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';

import { ShopService } from '../application/shop.service';
import Product from '../domain/product';
import { UpdateProductDto } from '../domain/dto/update-product.dto';
import { CreateProductDto } from '../domain/dto/create-product.dto';
import { UpdateResult } from 'src/shared/result/domain/update.result';
import { Roles } from 'src/auth/application/roles.decorator';
import { Role } from 'src/auth/domain/role';
import { Public } from 'src/auth/application/public.decorator';
@Controller("shop")
export class ShopController {
    constructor(private readonly shopService: ShopService) { }

    @Public()
    @Get()
    async getAllShopItems(): Promise<Product[]> {
        return this.shopService.getAllProducts();
    }

    @Public()
    @Get(":id")
    async getSpecificShopItem(@Param("id") id: string): Promise<Product> {
        return this.shopService.getProduct(id);
    }

    @Roles(Role.Admin)
    @Post()
    async createShopItem(@Body() product: CreateProductDto): Promise<void> {
        return this.shopService.createProduct(product);
    }

    @Roles(Role.Admin)
    @Put(":id")
    async modifyShopItem(@Param("id") id: string, @Body() updateShopItemDto: UpdateProductDto): Promise<void> {
        const result: UpdateResult = await this.shopService.updateProductById(id, updateShopItemDto);
        if (result === UpdateResult.NotFound) {
            throw new HttpException("Not modified.", HttpStatus.NOT_FOUND)
        }
    }

    @Roles(Role.Admin)
    @Delete(":id")
    async deleteShopItem(@Param("id") id: string): Promise<void> {
        const result: UpdateResult = await this.shopService.deleteProductById(id);
        if (result === UpdateResult.NotFound) {
            throw new HttpException("Not modified.", HttpStatus.NOT_FOUND)
        }
    }
}
