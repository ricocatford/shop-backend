import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AuthModule } from './auth/api/auth.module';

import { ShopController } from './shop/api/shop.controller';
import { ShopService } from './shop/application/shop.service';
import { ShopRepository } from './shop/domain/shop.repository';
import { ShopSqlRepository } from './shop/infrastructure/shop.sql.repository';

import { UserController } from './user/api/user.controller';
import { UserService } from './user/application/user.service';
import { UserRepository } from './user/domain/user.repository';
import { UserSqlRepository } from './user/infrastructure/user.sql.repository';

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
	controllers: [AppController, ShopController, UserController],
	providers: [
		AppService,
		ShopService,
		{ provide: ShopRepository, useClass: ShopSqlRepository },
		UserService,
		{ provide: UserRepository, useClass: UserSqlRepository }
	],
})

export class AppModule {
	constructor(private dataSource: DataSource) { }
}
