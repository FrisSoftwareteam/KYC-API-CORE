import { Types } from 'mongoose';
import { endOfDay, subDays, startOfDay } from 'date-fns';
import { BadRequestError } from '../errors/api.error';
import { AddressStatusEnum, AdminApprovalStatusEnum } from '../models/types/address.type';
import { PaymentStatusEnum } from '../models/types/agent-transaction.type';

const { ObjectId } = Types;
export default class AddressDataAccess {
  private readonly logger;
  private readonly fillable;
  private readonly AddressModel;
  private readonly TaskModel;
  private readonly AgentModel;
  private readonly IdentityModel;
  private readonly TransactionModel;
  private readonly mongooseConnection;
  private readonly AgentTransactionModel;

  constructor({
    logger,
    TaskModel,
    AddressModel,
    IdentityModel,
    mongooseConnection,
    AgentModel,
    TransactionModel,
    AgentTransactionModel, // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: any) {
    this.logger = logger;
    this.fillable = [
      'business',
      'candidate',
      'task',
      'cost',
      'agent',
      'notes',
      'position',
      'details',
      'audioUrl',
      'videoUrl',
      'status',
      'category',
      'images',
      'createdAt',
      'signature',
      'flagged',
      'approver',
      'timelines',
      'isFlagged',
      'submittedAt',
      'agentReports',
      'formatAddress',
      'submissionLocation',
      'submissionExpectedAt',
    ].join(' ');
    this.TaskModel = TaskModel;
    this.AgentModel = AgentModel;
    this.AddressModel = AddressModel;
    this.IdentityModel = IdentityModel;
    this.TransactionModel = TransactionModel;
    this.mongooseConnection = mongooseConnection;
    this.AgentTransactionModel = AgentTransactionModel;
  }

  async findAddressById(id: string) {
    const { AddressModel, fillable } = this;

    return AddressModel.findById(id).select(fillable).populate('candidate').lean().exec();
  }

  async findAddressByIdAndTask(id: string) {
    const { AddressModel, fillable } = this;

    return AddressModel.findById(id)
      .select(fillable)
      .populate({
        path: 'candidate',
      })
      .populate({
        path: 'task',
        populate: {
          path: 'business',
        },
      })
      .lean()
      .exec();
  }

  async findAllDataAddressById(id: string) {
    const { AddressModel, fillable } = this;

    return AddressModel.findById(id)
      .select(fillable)
      .populate('candidate')
      .populate({
        path: 'agent',
        populate: {
          path: 'user',
        },
      })
      .lean()
      .exec();
  }

  async findAddressByIds(ids: string[]) {
    const { AddressModel, fillable } = this;

    return AddressModel.find({
      _id: { $in: ids },
    })
      .select(fillable)
      .populate('candidate')
      .populate({
        path: 'agent',
        populate: {
          path: 'user',
        },
      })
      .lean()
      .exec();
  }

  async fetchAgentAddressByID(address: string, agent: string) {
    const { AddressModel, fillable } = this;

    return AddressModel.findOne({
      agent,
      _id: address,
    })
      .select(fillable)
      .populate('candidate')
      .lean()
      .exec();
  }

  async updateAddressById(
    id: string,
    setData: Record<string, unknown>,
    unsetData?: Record<string, unknown>,
  ) {
    const { AddressModel, fillable } = this;

    return AddressModel.findByIdAndUpdate(
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

  async updateAddressByIds(
    ids: string[],
    setData: Record<string, unknown>,
    unsetData?: Record<string, unknown>,
  ) {
    const { AddressModel } = this;

    return AddressModel.updateMany(
      { _id: { $in: ids } },
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
        multi: true,
      },
    )
      .lean()
      .exec();
  }

  async updateAddress(
    filter: Record<string, unknown>,
    setData: Record<string, unknown>,
    unsetData?: Record<string, unknown>,
  ) {
    const { AddressModel, fillable } = this;

    return AddressModel.findOneAndUpdate(
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

  async allPartnerVerifications(
    partnerId: string,
    {
      status,
      type,
      search,
      customStartDate,
      customEndDate,
      phoneNumber,
      email,
      state,
    }: {
      period: number;
      status: string;
      type: string;
      search: string;
      customStartDate: string;
      customEndDate: string;
      phoneNumber: string;
      email: string;
      state: string;
    },
    { offset, limit }: { offset: number; limit: number },
  ) {
    const { AddressModel } = this;

    return AddressModel.aggregate([
      {
        $lookup: {
          from: 'candidates',
          localField: 'candidate',
          foreignField: '_id',
          as: 'candidate',
        },
      },
      {
        $lookup: {
          from: 'agents',
          localField: 'agent',
          foreignField: '_id',
          as: 'agent',
          pipeline: [
            {
              $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
              },
            },
          ],
        },
      },
      {
        $match: {
          partner: partnerId,
          ...(search
            ? {
                $or: [
                  { 'agent.user.firstName': { $regex: new RegExp(search, 'i') } },
                  { 'agent.user.lastName': { $regex: new RegExp(search, 'i') } },
                ],
              }
            : undefined),
          ...(type
            ? {
                category: type,
              }
            : undefined),
          ...(email ? { 'agent.user.email': email } : undefined),
          ...(phoneNumber ? { 'agent.user.phoneNumber.number': phoneNumber } : undefined),
          ...(status && !Array.isArray(status) ? { status } : undefined),
          ...(status && Array.isArray(status) ? { status: { $in: status } } : undefined),
          ...(customStartDate && customEndDate
            ? {
                createdAt: {
                  $gte: new Date(customStartDate),
                  $lte: endOfDay(new Date(customEndDate)),
                },
              }
            : undefined),
          ...(state
            ? {
                'details.state': state.split(' ')[0],
              }
            : undefined),
        },
      },
      {
        $lookup: {
          from: 'tasks',
          localField: 'task',
          foreignField: '_id',
          as: 'task',
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

  async allAdminVerifications(
    {
      status,
      reviewStatus,
      type,
      search,
      customStartDate,
      customEndDate,
      phoneNumber,
      email,
      state,
      tat,
      underTat,
    }: {
      period: number;
      status: string;
      reviewStatus: string;
      type: string;
      search: string;
      customStartDate: string;
      customEndDate: string;
      phoneNumber: string;
      email: string;
      state: string;
      tat: string;
      underTat: string;
    },
    { offset, limit }: { offset: number; limit: number },
  ) {
    const { AddressModel } = this;

    // const tatDate = addHours(Date.now(), 24);

    return AddressModel.aggregate([
      {
        $lookup: {
          from: 'candidates',
          localField: 'candidate',
          foreignField: '_id',
          as: 'candidate',
        },
      },
      {
        $lookup: {
          from: 'agents',
          localField: 'agent',
          foreignField: '_id',
          as: 'agent',
          pipeline: [
            {
              $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
              },
            },
          ],
        },
      },
      {
        $match: {
          ...(search
            ? {
                $or: [
                  { 'agent.user.firstName': { $regex: new RegExp(search, 'i') } },
                  { 'agent.user.lastName': { $regex: new RegExp(search, 'i') } },
                ],
              }
            : undefined),
          ...(type
            ? {
                category: type,
              }
            : undefined),
          ...(email ? { 'agent.user.email': email } : undefined),
          ...(phoneNumber ? { 'agent.user.phoneNumber.number': phoneNumber } : undefined),
          ...(!reviewStatus && status && !Array.isArray(status) ? { status } : undefined),
          ...(!reviewStatus && status && Array.isArray(status)
            ? { status: { $in: status } }
            : undefined),
          ...(reviewStatus
            ? {
                'approver.status': { $in: reviewStatus },
                status: { $in: [AddressStatusEnum.VERIFIED, AddressStatusEnum.FAILED] },
              }
            : undefined),
          ...(tat ? { createdAt: { $in: reviewStatus } } : undefined),
          ...(underTat && underTat === 'yes'
            ? { submissionExpectedAt: { $gte: new Date() }, status: AddressStatusEnum.CREATED }
            : undefined),
          ...(underTat && underTat === 'no'
            ? { submissionExpectedAt: { $lte: new Date() }, status: AddressStatusEnum.CREATED }
            : undefined),
          ...(customStartDate && customEndDate
            ? {
                createdAt: {
                  $gte: new Date(customStartDate),
                  $lte: endOfDay(new Date(customEndDate)),
                },
              }
            : undefined),
          ...(state
            ? {
                'details.state': state.split(' ')[0],
              }
            : undefined),
        },
      },
      {
        $lookup: {
          from: 'tasks',
          localField: 'task',
          foreignField: '_id',
          as: 'task',
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

  async exportBusinessVerifications(
    businessId: string,
    {
      status,
      // type,
      search,
      customStartDate,
      customEndDate,
      phoneNumber,
      email,
      state,
    }: {
      period: number;
      status: string;
      // type: string;
      search: string;
      customStartDate: string;
      customEndDate: string;
      phoneNumber: string;
      email: string;
      state: string;
    },
  ) {
    const { AddressModel } = this;

    return AddressModel.aggregate([
      {
        $lookup: {
          from: 'candidates',
          localField: 'candidate',
          foreignField: '_id',
          as: 'candidate',
        },
      },
      {
        $lookup: {
          from: 'agents',
          localField: 'agent',
          foreignField: '_id',
          as: 'agent',
          pipeline: [
            {
              $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
              },
            },
          ],
        },
      },
      {
        $match: {
          business: businessId,
          ...(search
            ? {
                $or: [
                  { 'agent.user.firstName': { $regex: new RegExp(search, 'i') } },
                  { 'agent.user.lastName': { $regex: new RegExp(search, 'i') } },
                ],
              }
            : undefined),
          // ...(type
          //   ? {
          //     category: type,
          //   }
          //   : undefined),
          ...(email ? { 'agent.user.email': email } : undefined),
          ...(phoneNumber ? { 'agent.user.phoneNumber.number': phoneNumber } : undefined),
          ...(status && !Array.isArray(status) ? { status } : undefined),
          ...(status && Array.isArray(status) ? { status: { $in: status } } : undefined),
          ...(customStartDate && customEndDate
            ? {
                createdAt: {
                  $gte: new Date(customStartDate),
                  $lte: endOfDay(new Date(customEndDate)),
                },
              }
            : undefined),
          ...(state
            ? {
                'details.state': state.split(' ')[0],
              }
            : undefined),
        },
      },
      {
        $lookup: {
          from: 'tasks',
          localField: 'task',
          foreignField: '_id',
          as: 'task',
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
  }

  async fetchPartnerLimitedVerifications(partnerId: string, limit: number) {
    const { AddressModel } = this;

    return AddressModel.aggregate([
      {
        $match: {
          partner: partnerId,
        },
      },
      {
        $lookup: {
          from: 'candidates',
          localField: 'candidate',
          foreignField: '_id',
          as: 'candidate',
        },
      },
      {
        $lookup: {
          from: 'tasks',
          localField: 'task',
          foreignField: '_id',
          as: 'task',
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: limit,
      },
    ]);
  }

  async partnerDashboardMetrics(
    partnerId: string,
    {
      period,
      customStartDate,
      customEndDate,
    }: { period: number; customEndDate: string; customStartDate: string },
  ) {
    const { AddressModel } = this;

    const stoppedDate = subDays(new Date(), period);
    const startDate = startOfDay(stoppedDate);
    const endDate = endOfDay(stoppedDate);

    return AddressModel.aggregate([
      {
        $match: {
          partner: new ObjectId(partnerId),
          ...(period
            ? {
                createdAt: {
                  $gte: startDate,
                  $lte: endDate,
                },
              }
            : undefined),
          ...(customStartDate && customEndDate
            ? {
                createdAt: {
                  $gte: new Date(customStartDate),
                  $lte: endOfDay(new Date(customEndDate)),
                },
              }
            : undefined),
        },
      },
      {
        $group: {
          _id: null,
          totalVerifications: { $sum: 1 },
          totalCompletedVerifications: {
            $sum: {
              $cond: {
                if: {
                  $in: ['$status', [AddressStatusEnum.VERIFIED, AddressStatusEnum.FAILED]],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalVerificationInProgress: {
            $sum: {
              $cond: {
                if: {
                  $eq: ['$status', AddressStatusEnum.INPROGRESS],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalPendingVerification: {
            $sum: {
              $cond: {
                if: {
                  $and: [
                    {
                      $not: {
                        $in: ['$status', [AddressStatusEnum.VERIFIED, AddressStatusEnum.FAILED]],
                      },
                    },
                  ],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalUnassignVerification: {
            $sum: {
              $cond: {
                if: {
                  $eq: ['$status', AddressStatusEnum.CREATED],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalAssignedVerification: {
            $sum: {
              $cond: {
                if: {
                  $in: ['$status', [AddressStatusEnum.ACCEPTED]],
                },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalVerifications: 1,
          totalCompletedVerifications: 1,
          totalVerificationInProgress: 1,
          totalPendingVerification: 1,
          totalUnassignVerification: 1,
          totalAssignedVerification: 1,
        },
      },
    ]);
  }

  async adminVerificationMetrics({
    period,
    customStartDate,
    customEndDate,
  }: {
    period: number;
    customEndDate: string;
    customStartDate: string;
  }) {
    const { AddressModel } = this;

    const stoppedDate = subDays(new Date(), period);
    const startDate = startOfDay(stoppedDate);
    const endDate = endOfDay(stoppedDate);

    return AddressModel.aggregate([
      {
        $match: {
          ...(period
            ? {
                createdAt: {
                  $gte: startDate,
                  $lte: endDate,
                },
              }
            : undefined),
          ...(customStartDate && customEndDate
            ? {
                createdAt: {
                  $gte: new Date(customStartDate),
                  $lte: endOfDay(new Date(customEndDate)),
                },
              }
            : undefined),
        },
      },
      {
        $group: {
          _id: null,
          totalVerifications: { $sum: 1 },
          totalCompletedVerifications: {
            $sum: {
              $cond: {
                if: {
                  $in: ['$status', [AddressStatusEnum.VERIFIED, AddressStatusEnum.FAILED]],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalVerificationInProgress: {
            $sum: {
              $cond: {
                if: {
                  $eq: ['$status', AddressStatusEnum.INPROGRESS],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalPendingVerification: {
            $sum: {
              $cond: {
                if: {
                  $and: [
                    {
                      $not: {
                        $in: ['$status', [AddressStatusEnum.VERIFIED, AddressStatusEnum.FAILED]],
                      },
                    },
                  ],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalUnassignVerification: {
            $sum: {
              $cond: {
                if: {
                  $eq: ['$status', AddressStatusEnum.CREATED],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalAssignedVerification: {
            $sum: {
              $cond: {
                if: {
                  $in: ['$status', [AddressStatusEnum.ACCEPTED]],
                },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalVerifications: 1,
          totalCompletedVerifications: 1,
          totalVerificationInProgress: 1,
          totalPendingVerification: 1,
          totalUnassignVerification: 1,
          totalAssignedVerification: 1,
        },
      },
    ]);
  }

  async adminAddressVerificationMetrics() {
    const { AddressModel } = this;

    // const stoppedDate = subDays(new Date(), period);
    // const startDate = startOfDay(stoppedDate);
    // const endDate = endOfDay(stoppedDate);

    return AddressModel.aggregate([
      // {
      //   $match: {
      //     ...(period
      //       ? {
      //         createdAt: {
      //           $gte: startDate,
      //           $lte: endDate,
      //         },
      //       }
      //       : undefined),
      //     ...(customStartDate && customEndDate
      //       ? {
      //         createdAt: {
      //           $gte: new Date(customStartDate),
      //           $lte: endOfDay(new Date(customEndDate)),
      //         },
      //       }
      //       : undefined),
      //   },
      // },
      {
        $group: {
          _id: null,
          totalVerifications: { $sum: 1 },
          totalApprovedVerifications: {
            $sum: {
              $cond: {
                if: {
                  $in: [
                    '$approver.status',
                    [AdminApprovalStatusEnum.APPROVED, AdminApprovalStatusEnum.DECLINED],
                  ],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalPendingVerification: {
            $sum: {
              $cond: {
                if: {
                  $and: [
                    {
                      $in: ['$approver.status', [AdminApprovalStatusEnum.REVIEW]],
                    },
                    {
                      $in: ['$status', [AddressStatusEnum.VERIFIED, AddressStatusEnum.FAILED]],
                    },
                  ],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalUnderTATVerification: {
            $sum: {
              $cond: {
                if: {
                  $and: [
                    { $eq: ['$status', AddressStatusEnum.CREATED] },
                    { $gte: ['$submissionExpectedAt', new Date()] }, // Less than condition
                  ],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalOverTATVerification: {
            $sum: {
              $cond: {
                if: {
                  $and: [
                    { $eq: ['$status', AddressStatusEnum.CREATED] },
                    { $lte: ['$submissionExpectedAt', new Date()] }, // Less than condition
                  ],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalRejectedVerification: {
            $sum: {
              $cond: {
                if: {
                  $eq: ['$status', AddressStatusEnum.REJECTED],
                },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalVerifications: 1,
          totalApprovedVerifications: 1,
          totalPendingVerification: 1,
          totalUnderTATVerification: 1,
          totalOverTATVerification: 1,
          totalRejectedVerification: 1,
        },
      },
    ]);
  }

  async agentDashboardMetrics(agentId: string, period: number) {
    const { AddressModel } = this;

    const stoppedDate = subDays(new Date(), period);
    const startDate = startOfDay(stoppedDate);

    return AddressModel.aggregate([
      {
        $match: {
          agent: new ObjectId(agentId),
          createdAt: {
            $gte: startDate,
            $lte: new Date(),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalCompleted: {
            $sum: {
              $cond: {
                if: {
                  $eq: ['$status', AddressStatusEnum.VERIFIED],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalFailed: {
            $sum: {
              $cond: {
                if: {
                  $eq: ['$status', AddressStatusEnum.FAILED],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalInprogress: {
            $sum: {
              $cond: {
                if: {
                  $eq: ['$status', AddressStatusEnum.INPROGRESS],
                },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
    ]);
  }

  async agentTrendings(agentId: string, status: string, period: number) {
    const { AddressModel } = this;

    const stoppedDate = subDays(new Date(), period);
    const startDate = startOfDay(stoppedDate);

    return AddressModel.aggregate([
      {
        $match: {
          agent: new ObjectId(agentId),
          ...(status ? { status } : undefined),
          createdAt: {
            $gte: startDate,
            $lte: new Date(),
          },
        },
      },
      {
        $lookup: {
          from: 'candidates',
          localField: 'candidate',
          foreignField: '_id',
          as: 'candidate',
        },
      },
      {
        $limit: 10,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
  }

  async agentVerifications(
    agentId: string,
    status: string,
    period: number,
    { offset, limit }: { offset: number; limit: number },
  ) {
    const { AddressModel } = this;

    return AddressModel.aggregate([
      {
        $match: {
          agent: new ObjectId(agentId),
          ...(status ? { status } : undefined),
        },
      },
      {
        $lookup: {
          from: 'candidates',
          localField: 'candidate',
          foreignField: '_id',
          as: 'candidate',
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

  async allAgentVerifications(
    agentId: string,
    {
      status,
      type,
      search,
      customStartDate,
      customEndDate,
    }: {
      status: string;
      type: string;
      search: string;
      customStartDate: string;
      customEndDate: string;
    },
    { offset, limit }: { offset: number; limit: number },
  ) {
    const { AddressModel } = this;

    return AddressModel.aggregate([
      {
        $lookup: {
          from: 'candidates',
          localField: 'candidate',
          foreignField: '_id',
          as: 'candidate',
        },
      },
      {
        $match: {
          agent: new ObjectId(agentId),
          ...(search
            ? {
                $or: [
                  { 'candidate.firstName': { $regex: new RegExp(search, 'i') } },
                  { 'candidate.lastName': { $regex: new RegExp(search, 'i') } },
                ],
              }
            : undefined),
          ...(type
            ? {
                category: type,
              }
            : undefined),
          ...(status && !Array.isArray(status) ? { status } : undefined),
          ...(status && Array.isArray(status) ? { status: { $in: status } } : undefined),
          ...(customStartDate && customEndDate
            ? {
                createdAt: {
                  $gte: new Date(customStartDate),
                  $lte: endOfDay(new Date(customEndDate)),
                },
              }
            : undefined),
        },
      },
      {
        $lookup: {
          from: 'tasks',
          localField: 'task',
          foreignField: '_id',
          as: 'task',
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

  async getAgentPerformance(partnerId: string, agentId: string) {
    const { AddressModel } = this;

    return AddressModel.aggregate([
      {
        $match: {
          agent: new ObjectId(agentId),
          partner: new ObjectId(partnerId),
        },
      },
      {
        $group: {
          _id: null,
          totalVerifications: { $sum: 1 },
          totalCompletedVerifications: {
            $sum: {
              $cond: {
                if: {
                  $in: ['$status', [AddressStatusEnum.VERIFIED, AddressStatusEnum.FAILED]],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalPendingVerification: {
            $sum: {
              $cond: {
                if: {
                  $eq: ['$status', AddressStatusEnum.ACCEPTED],
                },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalVerifications: 1,
          totalCompletedVerifications: 1,
          totalPendingVerification: 1,
        },
      },
    ]);
  }

  async getAddressById(id: string) {
    const { AddressModel } = this;

    return AddressModel.findById(id);
  }

  async fetchTaskForAllReassign({ state, tasks }: { state: string; tasks: string[] }) {
    const { AddressModel } = this;

    return AddressModel.find({
      agent: null,
      ...(state
        ? {
            'details.state': state.split(' ')[0],
          }
        : undefined),
      ...(tasks?.length
        ? {
            _id: {
              $in: tasks.map((task: string) => new ObjectId(task)),
            },
          }
        : undefined),
    })
      .populate('candidate')
      .lean()
      .exec();
  }

  async getPartnerVerification(verificationId: string) {
    const { AddressModel } = this;

    return AddressModel.findById(verificationId)
      .populate(['candidate'])
      .populate({
        path: 'agent',
        populate: {
          path: 'user',
        },
      })
      .lean()
      .exec();
  }

  async updateAddressByIdTransaction(addressId: string, payload: Record<string, unknown>) {
    const { logger, mongooseConnection, AddressModel, AgentTransactionModel, AgentModel } = this;

    const session = await mongooseConnection.startSession();

    session.startTransaction();

    try {
      const address = await AddressModel.findByIdAndUpdate(addressId, payload).session(session);
      // console.log({address});
      if (!address) {
        throw new BadRequestError('Address not updated, error', { code: 'ADDRESS_NOT_UPDATED' });
      }
      // console.log({ task: address?.task, status: PaymentStatusEnum.SUCCESSFUL });

      const transaction = await AgentTransactionModel.findOneAndUpdate(
        { task: address?.task },
        { status: PaymentStatusEnum.SUCCESSFUL },
      ).session(session);
      // console.log({transaction});
      if (!transaction) {
        throw new BadRequestError('Transaction not updated, error', {
          code: 'TRANSACTION_NOT_UPDATED',
        });
      }

      const agent = await AgentModel.findById(transaction?.agent).session(session);

      if (!agent) {
        throw new BadRequestError('Agent not updated, error', { code: 'AGENT_NOT_FOUND' });
      }

      await AgentModel.findByIdAndUpdate(transaction?.agent, {
        wallet: {
          ...agent?.wallet,
          withdrawableAmount: Number(
            Number(agent?.wallet?.withdrawableAmount ?? 0) + Number(transaction.amount ?? 0),
          ),
        },
      }).session(session);

      await session.commitTransaction();

      return 'Address Unflagged Successfully';
    } catch (error) {
      // console.log({error});
      logger.error('abort transaction', error);
      await session.abortTransaction();

      throw new BadRequestError(error as string);
    } finally {
      session.endSession();
    }
  }
}
