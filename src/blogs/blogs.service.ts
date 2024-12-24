import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Blog } from './models/blog.model';
import { Comment } from './models/comment.model';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog)
    private blogModel: typeof Blog,
    @InjectModel(Comment)
    private commentModel: typeof Comment,
  ) {}

  async findAll(): Promise<Blog[]> {
    return this.blogModel.findAll({
      include: [Comment],
    });
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogModel.findByPk(id, {
      include: [Comment],
    });
    if (!blog) {
      throw new NotFoundException(`Blog #${id} not found`);
    }
    return blog;
  }

  // async create(createBlogDto: CreateBlogDto): Promise<Blog> {
  //   return this.blogModel.create(createBlogDto);
  // }
  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
  const blogData = {
    title: createBlogDto.title,
    content: createBlogDto.content,
    author: createBlogDto.author,
  };

  return this.blogModel.create(blogData);
}


  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.findOne(id);
    return blog.update(updateBlogDto);
  }

  async remove(id: string): Promise<void> {
    const blog = await this.findOne(id);
    await blog.destroy();
  }

  async getComments(blogId: string): Promise<Comment[]> {
    return this.commentModel.findAll({
      where: { blogId },
    });
  }

  async addComment(
    blogId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const blog = await this.findOne(blogId);
    return this.commentModel.create({
      ...createCommentDto,
      blogId: blog.id,
    });
  }
}