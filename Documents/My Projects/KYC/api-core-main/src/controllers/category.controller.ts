import { route, before, POST, GET, PUT } from 'awilix-express';
import { Request, Response } from 'express';
import { validate } from '../middlewares/validate.middleware';
import ResponseTransformer from '../utils/response.transformer';

import { categorySchema, CategoryInput } from '../schemas/category.schema';

@route('/categories')
export default class CategoryController {
  private readonly CategoryService;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ CategoryService }: any) {
    this.CategoryService = CategoryService;
  }

  @GET()
  @route('/')
  async fetchAll(req: Request, res: Response) {
    const { CategoryService } = this;

    const data = await CategoryService.fetchAll(req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:id')
  async fetchById(req: Request, res: Response) {
    const { CategoryService } = this;

    const data = await CategoryService.fetchById(req.params.id);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:id/services')
  async fetchServices(req: Request, res: Response) {
    const { CategoryService } = this;

    const data = await CategoryService.fetchServices(req.params.id);

    ResponseTransformer.success({ res, data });
  }

  @PUT()
  @route('/:id/update')
  @before([validate(categorySchema)])
  async updateCategory(req: Request, res: Response) {
    const { CategoryService } = this;

    const data = await CategoryService.updateCategory(req.params.id, req.body as CategoryInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/create')
  @before([validate(categorySchema)])
  async create(req: Request, res: Response) {
    const { CategoryService } = this;

    const data = await CategoryService.create(req.body as CategoryInput);

    ResponseTransformer.success({ res, data });
  }
}
