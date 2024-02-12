import { Module } from "@nestjs/common";
import { ShopService } from "../application/shop.service";
import { ShopController } from "./shop.controller";

@Module({
    controllers: [ShopController],
    providers: [ShopService]
})
export class ShopModule { }