import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { Blog } from './models/blog.model';
import { Comment } from './models/comment.model';

@Module({
  imports: [SequelizeModule.forFeature([Blog, Comment])],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}