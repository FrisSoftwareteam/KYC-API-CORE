import { route, before, POST, GET, PUT } from 'awilix-express';
import { Request, Response } from 'express';
import { validate } from '../middlewares/validate.middleware';
import ResponseTransformer from '../utils/response.transformer';
import {
  createServiceSchema,
  CreateServiceInput,
  updateServiceSchema,
  UpdateServiceInput,
} from '../schemas/service.schema';

@route('/services')
export default class ServiceController {
  private readonly ServiceService;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ ServiceService }: any) {
    this.ServiceService = ServiceService;
  }

  @GET()
  @route('/')
  async fetchAll(req: Request, res: Response) {
    const { ServiceService } = this;

    const data = await ServiceService.fetchAll(req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:id')
  async fetchById(req: Request, res: Response) {
    const { ServiceService } = this;

    const data = await ServiceService.fetchById(req.params.id);

    ResponseTransformer.success({ res, data });
  }

  @PUT()
  @route('/:id/update')
  @before([validate(updateServiceSchema)])
  async updateService(req: Request, res: Response) {
    const { ServiceService } = this;

    const data = await ServiceService.updateService(req.params.id, req.body as UpdateServiceInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/create')
  @before([validate(createServiceSchema)])
  async create(req: Request, res: Response) {
    const { ServiceService } = this;

    const data = await ServiceService.create(req.body as CreateServiceInput);

    ResponseTransformer.success({ res, data });
  }
}
