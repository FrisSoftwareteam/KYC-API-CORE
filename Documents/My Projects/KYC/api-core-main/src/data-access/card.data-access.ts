export default class CardDataAccess {
  private readonly logger;
  private readonly fillable;
  private readonly CardModel;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ logger, CardModel }: any) {
    this.logger = logger;
    this.fillable = [
      'business',
      'authorizationCode',
      'bin',
      'lastFourDigit',
      'expiryMonth',
      'expiryYear',
      'cardType',
      'reusable',
    ].join(' ');
    this.CardModel = CardModel;
  }

  async create(payload: Record<string, unknown>) {
    const { CardModel } = this;

    return (await CardModel.create(payload)).toObject();
  }

  async findCardById(id: string) {
    const { CardModel, fillable } = this;

    return CardModel.findById(id).select(fillable).lean().exec();
  }

  async findReusableCardById(id: string) {
    const { CardModel, fillable } = this;

    return CardModel.findOne({
      _id: id,
      reusable: true,
    })
      .select(fillable)
      .lean()
      .exec();
  }

  async findCardBySlug(slug: string) {
    const { CardModel, fillable } = this;

    return CardModel.findOne({
      slug,
    })
      .select(fillable)
      .lean()
      .exec();
  }

  async upsertCardData(
    filterData: Record<string, unknown>,
    setData: Record<string, unknown>,
    unsetData: Record<string, unknown>,
  ) {
    const { CardModel } = this;

    return CardModel.findOneAndUpdate(
      filterData,
      {
        ...(setData
          ? {
              $set: {
                ...filterData,
                ...setData,
              },
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
        upsert: true,
      },
    )
      .lean()
      .exec();
  }

  async all({ status }: { status: string }, { offset, limit }: { offset: number; limit: number }) {
    const { CardModel } = this;

    return CardModel.aggregate([
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

  async allBusinessCards(businessId: string) {
    const { CardModel, fillable } = this;

    return CardModel.find({
      business: businessId,
    })
      .select(fillable)
      .lean()
      .exec();
  }

  async deleteCardById(cardId: string, businessId: string) {
    const { CardModel } = this;

    return CardModel.findOneAndRemove({
      _id: cardId,
      business: businessId,
    });
  }
}
