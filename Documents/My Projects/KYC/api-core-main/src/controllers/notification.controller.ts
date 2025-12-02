import { route, GET, PUT } from 'awilix-express';
import { Request, Response } from 'express';
import ResponseTransformer from '../utils/response.transformer';

@route('/notifications')
export default class NotificationController {
  private readonly NotificationService;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ NotificationService }: any) {
    this.NotificationService = NotificationService;
  }

  @GET()
  @route('/')
  async fetchAll(req: Request, res: Response) {
    const { NotificationService } = this;

    const data = await NotificationService.fetchAll(req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:id')
  async fetchById(req: Request, res: Response) {
    const { NotificationService } = this;

    const data = await NotificationService.fetchById(req.params.id);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/models/admin')
  async fetchAdminNotifications(req: Request, res: Response) {
    const { NotificationService } = this;

    const data = await NotificationService.fetchAdminNotifications(req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/models/:type/:modelId')
  async fetchModelNotificationsByModelId(req: Request, res: Response) {
    const { NotificationService } = this;

    const data = await NotificationService.fetchModelNotificationsByModelId(req.params, req.query);

    ResponseTransformer.success({ res, data });
  }

  @PUT()
  @route('/mark-as-read')
  async markAsRead(req: Request, res: Response) {
    const { NotificationService } = this;

    const data = await NotificationService.markAsRead(req.body);

    ResponseTransformer.success({ res, data });
  }
}
