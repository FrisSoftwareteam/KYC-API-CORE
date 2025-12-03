export default class PassportDataAccess {
  private readonly logger;
  private readonly fillable;
  private readonly PassportModel;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ logger, PassportModel }: any) {
    this.logger = logger;
    this.fillable = [
      'firstName',
      'lastName',
      'dateOfBirth',
      'phoneNumber',
      'secondPhoneNumber',
      'gender',
      'id',
      'maritalStatus',
      'lgaOfOrigin',
      'stateOfOrigin',
      'watchListed',
      'nameOnCard',
      'imageUrl',
    ].join(' ');

    this.PassportModel = PassportModel;
  }

  async createPassport(payload: Record<string, unknown>) {
    const { PassportModel } = this;

    return (await PassportModel.create(payload)).toObject();
  }

  async findByPassport(id: string) {
    const { PassportModel, fillable } = this;

    return PassportModel.findOne({ id }).select(fillable).lean().exec();
  }
}
