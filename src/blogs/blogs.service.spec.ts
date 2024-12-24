import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { BlogsService } from './blogs.service';
import { Blog } from './models/blog.model';
import { Comment } from './models/comment.model';
import { NotFoundException } from '@nestjs/common';

describe('BlogsService', () => {
  let service: BlogsService;
  let blogModel: typeof Blog;
  let commentModel: typeof Comment;

  const mockBlog = {
    id: '1',
    title: 'Test Blog',
    content: 'Test Content',
    author: 'Test Author',
    comments: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogsService,
        {
          provide: getModelToken(Blog),
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockBlog]),
            findByPk: jest.fn().mockResolvedValue(mockBlog),
            create: jest.fn().mockResolvedValue(mockBlog),
          },
        },
        {
          provide: getModelToken(Comment),
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            create: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<BlogsService>(BlogsService);
    blogModel = module.get<typeof Blog>(getModelToken(Blog));
    commentModel = module.get<typeof Comment>(getModelToken(Comment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of blogs', async () => {
      const blogs = await service.findAll();
      expect(blogs).toEqual([mockBlog]);
      expect(blogModel.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a blog', async () => {
      const blog = await service.findOne('1');
      expect(blog).toEqual(mockBlog);
      expect(blogModel.findByPk).toHaveBeenCalledWith('1', { include: [Comment] });
    });

    it('should throw NotFoundException when blog not found', async () => {
      jest.spyOn(blogModel, 'findByPk').mockResolvedValueOnce(null);
      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });
});