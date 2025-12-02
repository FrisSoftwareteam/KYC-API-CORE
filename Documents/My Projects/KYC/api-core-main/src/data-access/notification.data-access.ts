import { NotificationModelTypeEnum } from '../constants';
import { INotification } from '../models/types/notification.type';
export default class NotificationDataAccess {
  private readonly logger;
  private readonly fillable;
  private readonly NotificationModel;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ logger, NotificationModel }: any) {
    this.logger = logger;
    this.fillable = ['actor', 'title', 'text', 'isRead', 'modelId', 'modelType'].join(' ');
    this.NotificationModel = NotificationModel;
  }

  async fetchModelNotificationsByModelId(id: string) {
    const { NotificationModel, fillable } = this;

    return NotificationModel.fetchModelNotificationsByModelId(id).select(fillable).lean().exec();
  }

  async fetchById(id: string) {
    const { NotificationModel, fillable } = this;

    return NotificationModel.fetchById(id).select(fillable).lean().exec();
  }

  async all({ status }: { status: string }) {
    const { NotificationModel } = this;

    return NotificationModel.find({
      ...(status ? { active: status } : undefined),
    });
  }

  async allByActor(actor: string) {
    const { NotificationModel } = this;

    return NotificationModel.find({ actor }).populate({ path: 'user' }).lean().exec();
  }

  async updateNotificationById(
    id: string,
    setData: Record<string, unknown>,
    unsetData: Record<string, unknown>,
  ) {
    const { NotificationModel } = this;

    return NotificationModel.findByIdAndUpdate(
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
    );
  }

  async markAsRead(
    ids: string,
    setData: Record<string, unknown>,
    unsetData: Record<string, unknown>,
  ) {
    const { NotificationModel } = this;

    return NotificationModel.updateMany(
      {
        _id: {
          $in: ids,
        },
      },
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
    );
  }

  async allAdmin({ limit }: { modelId: string; modelType: string; limit: number }) {
    const { NotificationModel } = this;

    return NotificationModel.find({ modelType: NotificationModelTypeEnum.ADMIN })
      .limit(limit)
      .sort({ createdAt: -1 });
  }

  async allByModel({
    modelId,
    modelType,
    limit,
  }: {
    modelId: string;
    modelType: string;
    limit: number;
  }) {
    const { NotificationModel } = this;

    return NotificationModel.find({ modelId, modelType }).limit(limit).sort({ createdAt: -1 });
  }

  async create(payload: INotification) {
    const { NotificationModel } = this;

    return (await NotificationModel.create(payload)).toObject();
  }
}
