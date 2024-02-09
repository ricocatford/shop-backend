import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ShopController } from './shop/api/shop.controller';
import { ShopService } from './shop/application/shop.service';
import { ShopRepository } from './shop/domain/shop-repository';
import { ShopSqlRepository } from './shop/infrastructure/shop.sql.repository';
import { AuthModule } from './auth/auth.module';

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
	}), AuthModule,],
	controllers: [AppController, ShopController],
	providers: [
		AppService,
		ShopService,
		{ provide: ShopRepository, useClass: ShopSqlRepository }
	],
})

export class AppModule {
	constructor(private dataSource: DataSource) { }
}
