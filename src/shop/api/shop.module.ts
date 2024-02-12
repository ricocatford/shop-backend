import { Module } from "@nestjs/common";
import { ShopService } from "../application/shop.service";
import { ShopController } from "./shop.controller";
import { ShopRepository } from "../domain/shop.repository";
import { ShopSqlRepository } from "../infrastructure/shop.sql.repository";

@Module({
    controllers: [ShopController],
    providers: [
        ShopService,
        { provide: ShopRepository, useClass: ShopSqlRepository }
    ]
})
export class ShopModule { }