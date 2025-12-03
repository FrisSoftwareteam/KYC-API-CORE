import { BadRequestError } from '../errors/api.error';
export default class BusinessServiceDataAccess {
  private readonly logger;
  private readonly fillable;
  private readonly mongooseConnection;
  private readonly BusinessServiceModel;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ BusinessServiceModel, mongooseConnection, logger }: any) {
    this.fillable = ['service', 'business', 'price'].join(' ');
    this.logger = logger;
    this.mongooseConnection = mongooseConnection;
    this.BusinessServiceModel = BusinessServiceModel;
  }

  async upsertBusinessService(businessId: string, payload: Record<string, unknown>) {
    const { logger, BusinessServiceModel, mongooseConnection } = this;

    const session = await mongooseConnection.startSession();

    session.startTransaction();

    try {
      await BusinessServiceModel.deleteMany({
        business: businessId,
      }).session(session);

      await BusinessServiceModel.create(payload, { session });

      await session.commitTransaction();

      return true;
    } catch (error) {
      logger.error('abort transaction', error);
      await session.abortTransaction();

      throw new BadRequestError(error as string);
    } finally {
      session.endSession();
    }
  }

  async allBusinessServices(businessId: string) {
    const { BusinessServiceModel, fillable } = this;

    return BusinessServiceModel.find({
      business: businessId,
    })
      .select(fillable)
      .populate('service')
      .lean()
      .exec();
  }
}
