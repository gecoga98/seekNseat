import { DynamicModule, MiddlewareConsumer, NestModule } from '@nestjs/common';

import { AppLoggerMiddleware } from './app.middleware';
import { AuthModule } from './auth/auth.module';
import { BootstrapModule } from './bootstrap.module';
import { BusinessModule } from './business/infrastructure';
import { CategoryModule } from './category/infrastructure';
import { UserModule } from './user/infrastructure';

export class AppModule implements NestModule {
  static forRoot(): DynamicModule {
    return {
      module: this,
      imports: [
        BootstrapModule,
        AuthModule,
        UserModule,
        CategoryModule,
        BusinessModule,
      ],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
