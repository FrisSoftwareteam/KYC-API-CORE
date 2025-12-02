// import { CreateCategoryInput } from '../validations/category.validation';

export default class AppDataAccess {
  private readonly AppModel;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ AppModel }: Record<string, any>) {
    this.AppModel = AppModel;
  }

  async create(): Promise<typeof AppModel> {
    const { AppModel } = this;

    const app = AppModel.save();

    return app;
  }
}
