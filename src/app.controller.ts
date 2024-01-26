import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import ShopItem from './shop/interfaces/shop-item.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
}
