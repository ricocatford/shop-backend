import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopController } from './shop/shop.controller';
import { ShopService } from './shop/shop.service';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'rootuser',
    database: 'shop',
    entities: [],
    synchronize: true,
  }),],
  controllers: [AppController, ShopController],
  providers: [AppService, ShopService],
})

export class AppModule {
  constructor(private dataSource: DataSource) { }
}
