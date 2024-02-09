import { Injectable } from '@nestjs/common';

import Product from '../domain/product';
import { UpdateProductDto } from '../domain/dto/update-product.dto';
import { CreateProductDto } from '../domain/dto/create-product.dto';

import { UpdateResult } from 'src/shared/result/domain/update.result';
import { ShopRepository } from '../domain/shop-repository';

@Injectable()
export class ShopService {
    constructor(private readonly shopRepository: ShopRepository) { }

    async getAllProducts(): Promise<Product[]> {
        return this.shopRepository.getAllProducts();
    }

    async getProduct(id: string): Promise<Product> {
        return this.shopRepository.getProductById(id);
    }

    async createProduct(product: CreateProductDto): Promise<void> {
        this.shopRepository.
            createProduct(product);
    }

    async modifyProductById(id: string, product: UpdateProductDto): Promise<UpdateResult> {
        return this.shopRepository.modifyProductById(id, product)
    }

    async deleteProductById(id: string): Promise<UpdateResult> {
        return this.shopRepository.deleteProductById(id);
    }
}
