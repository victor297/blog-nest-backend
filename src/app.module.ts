import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogsModule } from './blogs/blogs.module';
import { databaseConfig } from './database/database.config';

@Module({
  imports: [
    SequelizeModule.forRoot(databaseConfig),
    BlogsModule,
  ],
})
export class AppModule {}