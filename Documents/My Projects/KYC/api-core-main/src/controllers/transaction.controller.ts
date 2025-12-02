import { route, before, POST } from 'awilix-express';
import { Request, Response } from 'express';
import { validate } from '../middlewares/validate.middleware';
import ResponseTransformer from '../utils/response.transformer';
import {
  createFundWalletPaymentLinkSchema,
  CreateFundWalletPaymentLinkInput,
  verifyPaymentSchema,
  VerifyPaymentInput,
  resolveAccountNumberSchema,
  ResolveAccountNumberInput,
} from '../schemas/transaction.schema';

@route('/transactions')
export default class TransactionController {
  private readonly TransactionService;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ TransactionService }: any) {
    this.TransactionService = TransactionService;
  }

  @POST()
  @route('/payment-link')
  @before([validate(createFundWalletPaymentLinkSchema)])
  async createFundWalletPaymentLink(req: Request, res: Response) {
    const { TransactionService } = this;

    const data = await TransactionService.createFundWalletPaymentLink(
      req.body as CreateFundWalletPaymentLinkInput,
    );

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/verify')
  @before([validate(verifyPaymentSchema)])
  async verifyTransaction(req: Request, res: Response) {
    const { TransactionService } = this;

    const data = await TransactionService.verifyTransaction(req.body as VerifyPaymentInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/resolve-account')
  @before([validate(resolveAccountNumberSchema)])
  async resolveAccountNumber(req: Request, res: Response) {
    const { TransactionService } = this;

    const data = await TransactionService.resolveAccountNumber(
      req.body as ResolveAccountNumberInput,
    );

    ResponseTransformer.success({ res, data });
  }
}
