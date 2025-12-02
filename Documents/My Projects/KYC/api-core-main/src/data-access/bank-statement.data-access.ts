export default class BankStatementDataAccess {
  private readonly logger;
  private readonly fillable;
  private readonly BankStatmentModel;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ logger, BankStatmentModel }: any) {
    this.logger = logger;
    this.fillable = [
      'providerId',
      'requestData',
      'responseData',
      'task',
      'candidate',
      'business',
      'providerName',
    ].join(' ');
    this.BankStatmentModel = BankStatmentModel;
  }

  async createBankStatement(payload: Record<string, unknown>) {
    const { BankStatmentModel } = this;

    return (await BankStatmentModel.create(payload)).toObject();
  }

  async findById(id: string) {
    const { BankStatmentModel, fillable } = this;

    return BankStatmentModel.findById(id).select(fillable).lean().exec();
  }
}
