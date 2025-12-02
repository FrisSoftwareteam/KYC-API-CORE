export default class BvnDataAccess {
  private readonly logger;
  private readonly fillable;
  private readonly BvnModel;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ logger, BvnModel }: any) {
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
      'watchListed',
      'nameOnCard',
      'imageUrl',
    ].join(' ');
    this.BvnModel = BvnModel;
  }

  async createBvn(payload: Record<string, unknown>) {
    const { BvnModel } = this;

    return (await BvnModel.create(payload)).toObject();
  }

  async findByBvn(bvn: string) {
    const { BvnModel, fillable } = this;

    return BvnModel.findOne({ bvn }).select(fillable).lean().exec();
  }
}
