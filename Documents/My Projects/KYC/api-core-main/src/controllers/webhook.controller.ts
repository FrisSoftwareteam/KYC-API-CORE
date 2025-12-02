import { before, route, POST } from 'awilix-express';
import { Request, Response } from 'express';
import ResponseTransformer from '../utils/response.transformer';
import { paystackAuthenticate } from '../middlewares/paystack.middleware';

@route('/webhooks')
export default class WebhookController {
  private readonly WebhookService;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ WebhookService }: any) {
    this.WebhookService = WebhookService;
  }

  @POST()
  @route('/paystack')
  @before([paystackAuthenticate])
  async paystackWebhook(req: Request, res: Response) {
    const { WebhookService } = this;

    const data = await WebhookService.paystackWebhook(req.body);

    ResponseTransformer.success({ res, data });
  }
}
