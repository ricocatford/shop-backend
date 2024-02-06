import UpdateShopItemDto from "./dto/update-shop-item.dto";
import ShopItem from "./shop-item";

export abstract class ShopRepository {
    abstract getAllShopItems(): Promise<ShopItem[]>

    abstract getSpecificShopItem(id: string): Promise<ShopItem>

    abstract createShopItem(shopItem: ShopItem): void

    abstract modifyShopItem(id: string, shopItem: UpdateShopItemDto): void

    abstract deleteShopItem(id: string): void
}