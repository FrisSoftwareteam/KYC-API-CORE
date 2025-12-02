export default class InviteDataAccess {
  private readonly logger;
  private readonly fillable;
  private readonly BusinessModel;
  private readonly UserModel;
  private readonly InviteModel;
  private readonly mongooseConnection;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ logger, BusinessModel, InviteModel, UserModel, mongooseConnection }: any) {
    this.logger = logger;
    this.fillable = [
      'requestPayload',
      'email',
      'modelId',
      'type',
      'inviteToken',
      'inviteTokenExpiry',
    ].join(' ');
    this.BusinessModel = BusinessModel;
    this.InviteModel = InviteModel;
    this.UserModel = UserModel;
    this.mongooseConnection = mongooseConnection;
  }

  async updateInviteById(
    id: string,
    setData: Record<string, unknown>,
    unsetData: Record<string, unknown>,
  ) {
    const { InviteModel, fillable } = this;

    return InviteModel.findByIdAndUpdate(
      id,
      {
        ...(setData
          ? {
              $set: setData,
            }
          : undefined),
        ...(unsetData
          ? {
              $unset: unsetData,
            }
          : undefined),
      },
      {
        new: true,
      },
    )
      .select(fillable)
      .lean()
      .exec();
  }
}
