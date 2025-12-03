export default class CategoryDataAccess {
  private readonly logger;
  private readonly fillable;
  private readonly CategoryModel;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ logger, CategoryModel }: any) {
    this.logger = logger;
    this.fillable = ['name', 'slug', 'active'].join(' ');
    this.CategoryModel = CategoryModel;
  }

  async create(payload: Record<string, unknown>) {
    const { CategoryModel } = this;

    return (await CategoryModel.create(payload)).toObject();
  }

  async findCategoryById(id: string) {
    const { CategoryModel, fillable } = this;

    return CategoryModel.findById(id).select(fillable).lean().exec();
  }

  async findCategoryBySlug(slug: string) {
    const { CategoryModel, fillable } = this;

    return CategoryModel.findOne({
      slug,
    })
      .select(fillable)
      .lean()
      .exec();
  }

  async updateCategoryById(
    id: string,
    setData: Record<string, unknown>,
    unsetData: Record<string, unknown>,
  ) {
    const { CategoryModel, fillable } = this;

    return CategoryModel.findByIdAndUpdate(
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

  async all({ status }: { status: string }) {
    const { CategoryModel } = this;

    return CategoryModel.find({
      ...(status ? { active: status } : undefined),
    });
    // return ServiceModel.aggregate([
    //   {
    //     $match: {
    //       ...(status ? { active: status } : undefined),
    //     },
    //   },
    //   {
    //     $sort: { createdAt: -1 },
    //   },
    //   {
    //     $facet: {
    //       metadata: [{ $count: 'total' }, { $addFields: { page: 1 } }],
    //       data: [{ $skip: offset }, { $limit: limit }],
    //     },
    //   },
    // ]);
  }

  async allServices() {
    const { CategoryModel } = this;

    return CategoryModel.find().lean().exec();
  }
}
