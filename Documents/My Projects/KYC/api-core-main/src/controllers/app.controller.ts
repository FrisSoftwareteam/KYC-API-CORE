import { route, GET } from 'awilix-express';
import { Request, Response } from 'express';
// import {createCategorySchema} from '../validations/category.validation';
// import { validate } from '../middlewares/validate.middleware';
import ResponseTransformer from '../utils/response.transformer';

@route('/apps')
export default class AppController {
  private readonly PaystackProvider;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ PaystackProvider }: any) {
    this.PaystackProvider = PaystackProvider;
  }

  @GET()
  @route('/status')
  async statusCheck(req: Request, res: Response) {
    ResponseTransformer.success({
      res,
      data: {
        message: 'Welcome to firstregistrars api',
        status: 'Ok',
      },
    });
  }

  @GET()
  @route('/banks')
  async banks(req: Request, res: Response) {
    const { PaystackProvider } = this;

    const banks = await PaystackProvider.bankList();

    ResponseTransformer.success({ res, data: banks });
  }
}
