export default class DriverLicenseDataAccess {
  private readonly logger;
  private readonly fillable;
  private readonly DriverLicenseModel;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ logger, DriverLicenseModel }: any) {
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
      'imageUrl',
    ].join(' ');

    this.DriverLicenseModel = DriverLicenseModel;
  }

  async createDriverLicense(payload: Record<string, unknown>) {
    const { DriverLicenseModel } = this;

    return (await DriverLicenseModel.create(payload)).toObject();
  }

  async findByDriverLicense(id: string) {
    const { DriverLicenseModel, fillable } = this;

    return DriverLicenseModel.findOne({ idNumber: id }).select(fillable).lean().exec();
  }
}
