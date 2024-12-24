import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Blog } from '../blogs/models/blog.model';
import { Comment } from '../blogs/models/comment.model';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'sqlite',
  storage: 'blog.db',
  models: [Blog, Comment],
  autoLoadModels: true,
  synchronize: true,
};