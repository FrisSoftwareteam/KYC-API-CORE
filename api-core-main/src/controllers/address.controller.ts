import { route, before, POST } from 'awilix-express';
import { Request, Response } from 'express';
import { createIndividualAddressSchema } from '../schemas/address.schema';
import { validate } from '../middlewares/validate.middleware';
import ResponseTransformer from '../utils/response.transformer';

@route('/addresses')
export default class AddressController {
  private readonly AddressService;
  private readonly BusinessService;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ AddressService, BusinessService }: any) {
    this.AddressService = AddressService;
    this.BusinessService = BusinessService;
  }

  @POST()
  @route('/create')
  @before([validate(createIndividualAddressSchema)])
  async createIndividualVerification(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.createVerifications({
      chargeType: req.body.chargeType,

      ...(req.body?.card ? { card: req.body?.card } : undefined),
      countryCode: 'NG',
      businessId: req.body.businessId,
      userId: req.body.userId,
      candidateId: req.body.candidateId,
      verifications: {
        address: {
          street: req.body.address.street as string,
          subStreet: req.body.address.substreet as string,
          buildingNumber: req.body.address.buildingNumber as string,
          buildingName: req.body.address.buildingName as string,
          lga: req.body.address.lga as string,
          landmark: req.body.address.landmark as string,
          state: req.body.address.state as string,
          country: 'NG',
        },
      },
    });

    ResponseTransformer.success({ res, data });
  }
}
