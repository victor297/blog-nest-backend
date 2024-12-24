import { Test, TestingModule } from '@nestjs/testing';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';

describe('BlogsController', () => {
  let controller: BlogsController;
  let service: BlogsService;

  const mockBlog = {
    id: '1',
    title: 'Test Blog',
    content: 'Test Content',
    author: 'Test Author',
    comments: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogsController],
      providers: [
        {
          provide: BlogsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockBlog]),
            findOne: jest.fn().mockResolvedValue(mockBlog),
            create: jest.fn().mockResolvedValue(mockBlog),
            update: jest.fn().mockResolvedValue(mockBlog),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<BlogsController>(BlogsController);
    service = module.get<BlogsService>(BlogsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of blogs', async () => {
      const blogs = await controller.findAll();
      expect(blogs).toEqual([mockBlog]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a blog', async () => {
      const blog = await controller.findOne('1');
      expect(blog).toEqual(mockBlog);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });
});