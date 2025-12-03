export default class ProviderDataAccess {
  private readonly logger;
  private readonly fillable;
  private readonly ProviderModel;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ logger, ProviderModel }: any) {
    this.logger = logger;
    this.fillable = ['name', 'service', 'active', 'slug', 'prices'].join(' ');
    this.ProviderModel = ProviderModel;
  }

  async create(payload: Record<string, unknown>) {
    const { ProviderModel } = this;

    return (await ProviderModel.create(payload)).toObject();
  }

  async findProviderById(id: string) {
    const { ProviderModel, fillable } = this;

    return ProviderModel.findById(id).select(fillable).lean().exec();
  }

  async findActivatedProvider(type: string) {
    const { ProviderModel, fillable } = this;

    return ProviderModel.findOne({
      service: type,
      selected: true,
      active: true,
    })
      .select(fillable)
      .lean()
      .exec();
  }

  async updateProviderById(
    id: string,
    setData: Record<string, unknown>,
    unsetData: Record<string, unknown>,
  ) {
    const { ProviderModel, fillable } = this;

    return ProviderModel.findByIdAndUpdate(
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

  async all({ status }: { status: string }, { offset, limit }: { offset: number; limit: number }) {
    const { ProviderModel } = this;

    return ProviderModel.aggregate([
      {
        $match: {
          ...(status ? { active: status } : undefined),
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }, { $addFields: { page: 1 } }],
          data: [{ $skip: offset }, { $limit: limit }],
        },
      },
    ]);
  }
}
