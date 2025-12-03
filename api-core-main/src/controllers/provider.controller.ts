import { route, before, POST, GET, PUT } from 'awilix-express';
import { Request, Response } from 'express';
import { validate } from '../middlewares/validate.middleware';
import ResponseTransformer from '../utils/response.transformer';
import {
  createProviderSchema,
  CreateProviderInput,
  updateProviderSchema,
  UpdateProviderInput,
  setProviderSchema,
  SetProviderInput,
} from '../schemas/provider.schema';

@route('/providers')
export default class ProviderController {
  private readonly ProviderService;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ ProviderService }: any) {
    this.ProviderService = ProviderService;
  }

  @GET()
  @route('/')
  async fetchAll(req: Request, res: Response) {
    const { ProviderService } = this;

    const data = await ProviderService.fetchAll(req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:id')
  async fetchById(req: Request, res: Response) {
    const { ProviderService } = this;

    const data = await ProviderService.fetchById(req.params.id);

    ResponseTransformer.success({ res, data });
  }

  @PUT()
  @route('/:id/update')
  @before([validate(updateProviderSchema)])
  async updateProvider(req: Request, res: Response) {
    const { ProviderService } = this;

    const data = await ProviderService.updateProvider(
      req.params.id,
      req.body as UpdateProviderInput,
    );

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/create')
  @before([validate(createProviderSchema)])
  async create(req: Request, res: Response) {
    const { ProviderService } = this;

    const data = await ProviderService.create(req.body as CreateProviderInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/activate')
  @before([validate(setProviderSchema)])
  async setProvider(req: Request, res: Response) {
    const { ProviderService } = this;

    const data = await ProviderService.setProvider(req.body as SetProviderInput);

    ResponseTransformer.success({ res, data });
  }
}
