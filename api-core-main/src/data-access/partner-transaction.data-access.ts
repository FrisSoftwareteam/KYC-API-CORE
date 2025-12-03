import * as mongoose from 'mongoose';
import { subDays, startOfDay, endOfDay } from 'date-fns';

const {
  Types: { ObjectId },
} = mongoose;

export default class PartnerTransactionDataAccess {
  private readonly logger;
  private readonly fillable;
  private readonly PartnerTransactionModel;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ logger, PartnerTransactionModel }: any) {
    this.logger = logger;
    this.PartnerTransactionModel = PartnerTransactionModel;

    this.fillable = [
      'type',
      'type',
      'amount',
      'status',
      'paidAt',
      'partner',
      'bankName',
      'accountNumber',
    ].join(' ');
  }

  async create(payload: Record<string, unknown>) {
    const { PartnerTransactionModel } = this;

    return (await PartnerTransactionModel.create(payload)).toObject();
  }

  async findTransactionById(id: string) {
    const { PartnerTransactionModel, fillable } = this;

    return PartnerTransactionModel.findById(id).select(fillable).lean().exec();
  }

  async findLastTransactionByTask(task: string) {
    const { PartnerTransactionModel, fillable } = this;

    return PartnerTransactionModel.findOne({
      task,
    })
      .select(fillable)
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  async findTransactionByTransferCode(transferCode: string) {
    const { PartnerTransactionModel, fillable } = this;

    return PartnerTransactionModel.findOne({
      transferCode,
    })
      .select(fillable)
      .lean()
      .exec();
  }

  async updateTransaction(
    transferCode: string,
    setData: Record<string, unknown>,
    unsetData: Record<string, unknown>,
  ) {
    const { PartnerTransactionModel, fillable } = this;

    return PartnerTransactionModel.findOneAndUpdate(
      {
        transferCode,
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
    )
      .select(fillable)
      .lean()
      .exec();
  }

  async updateTransactionById(
    id: string,
    setData: Record<string, unknown>,
    unsetData: Record<string, unknown>,
  ) {
    const { PartnerTransactionModel, fillable } = this;

    return PartnerTransactionModel.findByIdAndUpdate(
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

  async updateOneTransaction(
    filter: Record<string, unknown>,
    setData: Record<string, unknown>,
    unsetData: Record<string, unknown>,
  ) {
    const { PartnerTransactionModel, fillable } = this;

    return PartnerTransactionModel.findOneAndUpdate(
      filter,
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
    const { PartnerTransactionModel } = this;

    return PartnerTransactionModel.aggregate([
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

  async allPartnerWithdrawals(
    partnerId: string,
    {
      period,
      status,
      type,
      customStartDate,
      customEndDate,
    }: {
      period: number;
      status: string;
      type: string;
      customStartDate: string;
      customEndDate: string;
    },
    { offset, limit }: { offset: number; limit: number },
  ) {
    const { PartnerTransactionModel } = this;

    const stoppedDate = subDays(new Date(), period);
    const startDate = startOfDay(stoppedDate);

    return PartnerTransactionModel.aggregate([
      {
        $match: {
          partner: new ObjectId(partnerId),
          ...(status ? { status } : undefined),
          ...(type ? { type } : undefined),
          ...(period && (!customStartDate || !customEndDate)
            ? {
                createdAt: {
                  $gte: startDate,
                  $lte: new Date(),
                },
              }
            : undefined),
          ...(customStartDate && customEndDate
            ? {
                createdAt: {
                  // $gte: new Date(addDays(customStartDate, 1)),
                  // $lte: new Date(addDays(customEndDate, 1)),
                  $gte: startOfDay(customEndDate),
                  $lte: endOfDay(customStartDate),
                },
              }
            : undefined),
        },
      },
      {
        $lookup: {
          from: 'partners',
          localField: 'partner',
          foreignField: '_id',
          as: 'partner',
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
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
