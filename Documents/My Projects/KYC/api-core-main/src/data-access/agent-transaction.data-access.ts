import * as mongoose from 'mongoose';
import { subDays, startOfDay, endOfDay } from 'date-fns';

const {
  Types: { ObjectId },
} = mongoose;

export default class AgentTransactionDataAccess {
  private readonly logger;
  private readonly fillable;
  private readonly AgentTransactionModel;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ logger, AgentTransactionModel }: any) {
    this.logger = logger;
    this.AgentTransactionModel = AgentTransactionModel;

    this.fillable = [
      'agent',
      'amount',
      'type',
      'status',
      'paidAt',
      'accountNumber',
      'bankName',
      'type',
    ].join(' ');
  }

  async create(payload: Record<string, unknown>) {
    const { AgentTransactionModel } = this;

    return (await AgentTransactionModel.create(payload)).toObject();
  }

  async findTransactionById(id: string) {
    const { AgentTransactionModel, fillable } = this;

    return AgentTransactionModel.findById(id).select(fillable).lean().exec();
  }

  async findLastTransactionByTask(task: string) {
    const { AgentTransactionModel, fillable } = this;

    return AgentTransactionModel.findOne({
      task,
    })
      .select(fillable)
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  async findTransactionByTransferCode(transferCode: string) {
    const { AgentTransactionModel, fillable } = this;

    return AgentTransactionModel.findOne({
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
    const { AgentTransactionModel, fillable } = this;

    return AgentTransactionModel.findOneAndUpdate(
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
    const { AgentTransactionModel, fillable } = this;

    return AgentTransactionModel.findByIdAndUpdate(
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
    const { AgentTransactionModel, fillable } = this;

    return AgentTransactionModel.findOneAndUpdate(
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
    const { AgentTransactionModel } = this;

    return AgentTransactionModel.aggregate([
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

  async allAgentWithdrawals(
    agentId: string,
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
    const { AgentTransactionModel } = this;

    const stoppedDate = subDays(new Date(), period);
    const startDate = startOfDay(stoppedDate);

    return AgentTransactionModel.aggregate([
      {
        $match: {
          agent: new ObjectId(agentId),
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
          from: 'agents',
          localField: 'agent',
          foreignField: '_id',
          as: 'agent',
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
