export default class NinDataAccess {
  private readonly logger;
  private readonly fillable;
  private readonly NinModel;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ logger, NinModel }: any) {
    this.logger = logger;
    this.fillable = [
      'firstName',
      'lastName',
      'dateOfBirth',
      'phoneNumber',
      'secondPhoneNumber',
      'gender',
      'nin',
      'maritalStatus',
      'lgaOfOrigin',
      'stateOfOrigin',
      'imageUrl',
      'email',
      'birthState',
      'nextOfKinState',
      'religion',
      'birthLGA',
      'birthCountry',
      'country',
    ].join(' ');
    this.NinModel = NinModel;
  }

  async createNin(payload: Record<string, unknown>) {
    const { NinModel } = this;

    return (await NinModel.create(payload)).toObject();
  }

  async findByNin(nin: string) {
    const { NinModel, fillable } = this;

    return NinModel.findOne({ nin }).select(fillable).lean().exec();
  }
}
