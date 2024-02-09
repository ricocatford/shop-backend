import Product from "./product";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateResult } from "src/shared/result/domain/update.result";

export abstract class ShopRepository {
    abstract getAllProducts(): Promise<Product[]>

    abstract getProductById(id: string): Promise<Product>

    abstract createProduct(product: CreateProductDto): void

    abstract modifyProductById(id: string, product: UpdateProductDto): Promise<UpdateResult>

    abstract deleteProductById(id: string): Promise<UpdateResult>
}