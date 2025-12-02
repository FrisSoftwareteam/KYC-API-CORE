import { route, before, POST } from 'awilix-express';
import { Request, Response } from 'express';
import { createBundleSchema, CreateBundleInput } from '../schemas/bundle.schema';
import { validate } from '../middlewares/validate.middleware';
import ResponseTransformer from '../utils/response.transformer';

@route('/bundles')
export default class BundleController {
  private readonly BundleService;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ BundleService }: any) {
    this.BundleService = BundleService;
  }

  @POST()
  @route('/create')
  @before([validate(createBundleSchema)])
  async createBundle(req: Request, res: Response) {
    const { BundleService } = this;

    const data = await BundleService.create(req.body as CreateBundleInput);

    ResponseTransformer.success({ res, data });
  }
}
