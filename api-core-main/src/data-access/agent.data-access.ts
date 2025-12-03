import { endOfDay, subDays, startOfDay } from 'date-fns';
import { Types } from 'mongoose';
const { ObjectId } = Types;
import { UserStatus } from '../models/user.model';
import { AgentStatus } from '../models/types/agent.type';

export default class AgentDataAccess {
  private readonly fillable;
  private readonly AgentModel;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ AgentModel }: any) {
    this.fillable = [
      'name',
      'address',
      'partner',
      'status',
      'onlineStatus',
      'fcmTokens',
      'eventId',
      'imageUrl',
      'bank',
      'wallet',
      'state',
      'user',
    ].join(' ');
    this.AgentModel = AgentModel;
  }

  async findAgentById(id: string) {
    const { AgentModel, fillable } = this;

    return AgentModel.findById(id).populate(['user', 'partner']).select(fillable).lean().exec();
  }

  async updateAgentById(
    id: string,
    setData: Record<string, unknown>,
    unsetData: Record<string, unknown>,
  ) {
    const { AgentModel, fillable } = this;

    return AgentModel.findByIdAndUpdate(
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

  async saveFcmToken(id: string, fcm: string) {
    const { AgentModel, fillable } = this;

    return AgentModel.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          fcmTokens: fcm,
        },
      },
      {
        upsert: true,
      },
    )
      .select(fillable)
      .lean()
      .exec();
  }

  async all(
    {
      status,
    }: {
      status: string;
    },
    { offset, limit }: { offset: number; limit: number },
  ) {
    const { AgentModel } = this;

    return AgentModel.aggregate([
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

  async partnerAgents(
    partnerId: string,
    {
      period,
      status,
      type,
      search,
      email,
      customStartDate,
      customEndDate,
      state,
    }: {
      period: number;
      status: string;
      type: string;
      search: string;
      customStartDate: string;
      customEndDate: string;
      email: string;
      state: string;
    },
    { offset, limit }: { offset: number; limit: number },
  ) {
    const { AgentModel } = this;

    const stoppedDate = subDays(new Date(), period);
    const startDate = startOfDay(stoppedDate);

    return AgentModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $match: {
          partner: new ObjectId(partnerId),
          ...(search
            ? {
                $or: [
                  { 'user.firstName': { $regex: new RegExp(search, 'i') } },
                  { 'user.lastName': { $regex: new RegExp(search, 'i') } },
                ],
              }
            : undefined),
          ...(email
            ? {
                'user.email': email,
              }
            : undefined),
          ...(type
            ? {
                verifications: type,
              }
            : undefined),
          ...(status ? { status } : undefined),
          ...(state ? { state } : undefined),
          ...(period && (!customStartDate || !customEndDate)
            ? {
                createdAt: {
                  $gte: startDate,
                  $lte: endOfDay(new Date()),
                },
              }
            : undefined),
          ...(customStartDate && customEndDate
            ? {
                createdAt: {
                  $lte: endOfDay(new Date(customEndDate)),
                  $gte: startOfDay(new Date(customStartDate)),
                },
                // createdAt: {
                //   $lte: new Date(format(customEndDate, 'dd-MM-yyyy')),
                //   $gte: new Date(format(customStartDate, 'dd-MM-yyyy')),
                // },
              }
            : undefined),
        },
      },
      {
        $unwind: '$user',
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

  async findByUserId(user: string) {
    const { AgentModel, fillable } = this;

    return AgentModel.findOne({
      user,
    })
      .select(fillable)
      .lean()
      .exec();
  }

  async getAgentByPartnerId(partner: string) {
    const { AgentModel, fillable } = this;

    return AgentModel.find({
      partner: new ObjectId(partner),
    })
      .select(fillable)
      .populate({
        path: 'user',
      })
      .lean()
      .exec();
  }

  async updateAgentStatus(businessId: string, businessUserId: string) {
    const { AgentModel, fillable } = this;

    return AgentModel.findOneAndUpdate(
      {
        _id: businessId,
        'users._id': businessUserId,
      },
      {
        $set: {
          'users.$.status': UserStatus.ACTIVE,
        },
      },
    )
      .select(fillable)
      .lean()
      .exec();
  }

  async fetchAgentByIds(agentIds: string[]) {
    const { AgentModel, fillable } = this;

    return AgentModel.find({
      _id: {
        $in: agentIds,
      },
    })
      .populate('partner')
      .select(fillable)
      .lean()
      .exec();
  }

  async fetchPopulatedAgentByIds(agentIds: string[]) {
    const { AgentModel, fillable } = this;

    return AgentModel.find({
      _id: {
        $in: agentIds,
      },
    })
      .select(fillable)
      .populate('user')
      .lean()
      .exec();
  }

  async suspendPartnerAgent(agentId: string) {
    const { AgentModel } = this;

    return AgentModel.findByIdAndUpdate(agentId, {
      $set: {
        status: AgentStatus.SUSPENDED,
      },
    });
  }

  async restorePartnerAgent(agentId: string) {
    const { AgentModel } = this;

    return AgentModel.findByIdAndUpdate(agentId, {
      $set: {
        status: AgentStatus.ACTIVE,
      },
    });
  }

  countAllAgents(query: Record<string, unknown>) {
    const { AgentModel } = this;

    const { customEndDate, customStartDate } = query;

    return AgentModel.countDocuments({
      ...(customEndDate && customStartDate
        ? {
            createdAt: {
              $gte: startOfDay(String(customStartDate)),
              $lte: endOfDay(String(customEndDate)),
            },
          }
        : undefined),
    });
  }
}
