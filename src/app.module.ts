import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopController } from './shop/api/shop.controller';
import { ShopService } from './shop/application/shop.service';
import { DataSource } from 'typeorm';
import { ShopSqlRepository } from './shop/infrastructure/shop.sql.repository';

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
  providers: [AppService, ShopService, ShopSqlRepository],
})

export class AppModule {
  constructor(private dataSource: DataSource) { }
}
